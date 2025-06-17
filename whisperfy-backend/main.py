from fastapi import FastAPI, Request, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
import whisper
import requests
import tempfile
import os
import logging
from dotenv import load_dotenv

# Firebase Admin
import firebase_admin
from firebase_admin import credentials, auth, firestore

# Stripe
import stripe

# Load environment variables
load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Initialize Firebase Admin
cred = credentials.Certificate("firebase/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load Whisper model once
logger.info("Loading Whisper model...")
model = whisper.load_model("base")
logger.info("Whisper model loaded.")

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Whisper API is running!"}

@app.post("/transcribe")
async def transcribe_audio(request: Request, authorization: str = Header(None)):
    temp_file_path = None
    try:
        if not authorization or not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Missing or invalid token")

        id_token = authorization.split("Bearer ")[1]
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token["uid"]

        body = await request.json()
        file_url = body.get("fileUrl")
        if not file_url:
            raise HTTPException(status_code=400, detail="Missing fileUrl")

        logger.info(f"Downloading file: {file_url}")
        response = requests.get(file_url)
        if response.status_code != 200:
            logger.error(f"Download failed: {response.status_code}")
            raise HTTPException(status_code=400, detail="Failed to download file")

        ext = os.path.splitext(file_url)[1] or ".mp4"
        temp_file_path = tempfile.mktemp(suffix=ext)
        with open(temp_file_path, "wb") as f:
            f.write(response.content)

        logger.info("Transcribing file...")
        result = model.transcribe(temp_file_path)
        transcript_text = result["text"]
        word_count = len(transcript_text.strip().split())

        user_ref = db.collection("users").document(uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            logger.info(f"Creating new user doc for {uid}")
            user_data = {
                "tokens": 5000,
                "wordsTranscribed": 0,
                "totalTranscriptions": 0,
            }
            user_ref.set(user_data)
            user_doc = user_ref.get()

        user_data = user_doc.to_dict()
        current_tokens = user_data.get("tokens", 0)
        words_transcribed = user_data.get("wordsTranscribed", 0)
        total_transcriptions = user_data.get("totalTranscriptions", 0)

        if current_tokens < word_count:
            raise HTTPException(status_code=403, detail="Not enough tokens")

        user_ref.update({
            "tokens": current_tokens - word_count,
            "wordsTranscribed": words_transcribed + word_count,
            "totalTranscriptions": total_transcriptions + 1
        })

        db.collection("users").document(uid).collection("transcriptions").add({
        "transcription": transcript_text,
        "fileUrl": file_url,
        "wordCount": word_count,
        "createdAt": firestore.SERVER_TIMESTAMP,
        "previewText": " ".join(transcript_text.strip().split()[:3])  # 👈 first 3 words
})


        logger.info(f"Transcription complete for user {uid}")
        return {
            "transcription": transcript_text,
            "tokensUsed": word_count,
            "tokensRemaining": current_tokens - word_count
        }

    except Exception as e:
        logger.exception("Error in /transcribe")
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            logger.info(f"Deleted temp file: {temp_file_path}")

@app.post("/create-checkout-session")
async def create_checkout_session(request: Request):
    body = await request.json()
    email = body.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Missing email")

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "unit_amount": 100,  # $1.00 = 2400 tokens
                    "product_data": {
                        "name": "VoxScribe Transcription Tokens (2400)",
                    },
                },
                "quantity": 1,
            }],
            mode="payment",
            customer_email=email,
            success_url=os.getenv("FRONTEND_SUCCESS_URL"),
            cancel_url=os.getenv("FRONTEND_CANCEL_URL"),
        )
        return {"id": session.id}
    except Exception as e:
        logger.exception("Stripe session creation failed")
        raise HTTPException(status_code=500, detail=str(e))
