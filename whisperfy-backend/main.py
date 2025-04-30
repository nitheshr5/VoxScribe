from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import whisper
import requests
import tempfile
import os
import logging

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Load Whisper model once at startup
logger.info("Loading Whisper model...")
model = whisper.load_model("base")
logger.info("Whisper model loaded.")

# CORS setup for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TranscriptionRequest(BaseModel):
    fileUrl: str

@app.post("/transcribe")
async def transcribe_audio(request: TranscriptionRequest):
    temp_file_path = None
    try:
        logger.info(f"Downloading file: {request.fileUrl}")
        response = requests.get(request.fileUrl)

        if response.status_code != 200:
            logger.error(f"Download failed: {response.status_code}")
            return {"error": "Failed to download file from Firebase Storage."}

        # Get file extension from URL (fallback to .mp4)
        ext = os.path.splitext(request.fileUrl)[1] or ".mp4"
        temp_file_path = tempfile.mktemp(suffix=ext)

        with open(temp_file_path, "wb") as f:
            f.write(response.content)

        file_size = os.path.getsize(temp_file_path)
        logger.info(f"Saved file to {temp_file_path} ({file_size} bytes)")

        logger.info("Transcribing...")
        result = model.transcribe(temp_file_path)

        logger.info("Transcription complete.")
        return {"transcription": result["text"]}

    except Exception as e:
        logger.exception("Error during transcription")
        return {"error": str(e)}

    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            logger.info(f"Temporary file deleted: {temp_file_path}")
            
@app.get("/")
async def root():
    return {"message": "Whisper API is running!"}

