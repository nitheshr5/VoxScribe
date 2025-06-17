// firebase.js (place this in your project root)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyAwsU_k6h7Ls1thjxstGxzhB80DwDfrxX8",
  authDomain: "voxscribe-51403.firebaseapp.com",
  projectId: "voxscribe-51403",
  storageBucket: "voxscribe-51403.firebasestorage.app",
  messagingSenderId: "792452726848",
  appId: "1:792452726848:web:c20dc2e908d4e9e39c1fa5",
  measurementId: "G-2Q0QBZD722"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
