VoxScribe 📝🎧
VoxScribe is a full-stack transcription platform that allows users to upload audio or video files and receive accurate, timestamped transcriptions powered by OpenAI's Whisper model.
🔧 Tech Stack
Frontend

Framework: Next.js
Styling: Tailwind CSS
Authentication: Firebase Auth

Backend

Framework: Python + Flask
Transcription: OpenAI Whisper
Storage: Firebase Storage
Database: Firestore
Auth Verification: Firebase Admin SDK

🚀 Features

🔐 Secure Firebase authentication
📂 Upload audio/video files
🧠 Whisper-powered transcription
🕒 View transcription history
📉 Token-based usage system
🎛️ Responsive dashboard

🔑 Environment Variables
Your .env.local file should contain:
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_CLIENT_ID=your_client_id

# Stripe (if used)
STRIPE_SECRET_KEY=your_key

⚠️ Git History Cleanup Notes
Background: Initially, a sensitive file (serviceAccountKey.json) containing Firebase Admin credentials was committed to Git. GitHub blocked future pushes because the secret was scanned and flagged.
Steps Taken:

Added the sensitive file to .gitignore:whisperfy-backend/firebase/serviceAccountKey.json


Rewrote Git history using git filter-repo:git clone https://github.com/nitheshr5/VoxScribe.git cleaned-repo
cd cleaned-repo
git filter-repo --path whisperfy-backend/firebase/serviceAccountKey.json --invert-paths


Force pushed the cleaned history:git push origin main --force



Note: Never commit secrets like API keys or service account files directly. Use .env files and ensure sensitive files are listed in .gitignore.
🛠️ Setup Instructions

Clone the repository:
git clone https://github.com/nitheshr5/VoxScribe.git
cd VoxScribe


Install dependencies:

Frontend:cd frontend
npm install


Backend (if running locally):cd whisperfy-backend
pip install -r requirements.txt




Add environment variables:

Create a .env.local file in the root for the frontend and configure any necessary backend settings.


Run the project:

Frontend:npm run dev


Backend:python app.py





📄 License
This project is licensed under the MIT License.
🙏 Acknowledgements

Firebase
OpenAI Whisper
Tailwind CSS
Next.js

👨‍💻 Developer

Name: Nithesh
Email: nitheshrpoojari5@gmail.com

