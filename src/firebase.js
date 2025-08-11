// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAsgrZUl5LjTzhPsDe3k6pc0xDev7wH4C8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "careerpad-09.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "careerpad-09",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "careerpad-09.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1016931265393",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1016931265393:web:ed7b4dd9e35c3e18e924d0",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-KJGF0NZKKP"
};

const app = initializeApp(firebaseConfig);

// ✅ Correctly create all services
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app, "us-central1");

console.log("✅ Firebase initialized");
console.log("🔥 Auth:", auth);

// ✅ Export all necessary objects
export { app, auth, db, functions };
