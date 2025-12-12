// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQFuEVLyB2PeUHwwALM9MtsWnzTzoQSWE",
  authDomain: "ottgpt-7e755.firebaseapp.com",
  projectId: "ottgpt-7e755",
  storageBucket: "ottgpt-7e755.firebasestorage.app",
  messagingSenderId: "998960911326",
  appId: "1:998960911326:web:8d7d86bd929dbfce4e834f",
  measurementId: "G-7HQ426732C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
