// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "baatcheet-bc3de.firebaseapp.com",
  projectId: "baatcheet-bc3de",
  storageBucket: "baatcheet-bc3de.firebasestorage.app",
  messagingSenderId: "436451505442",
  appId: "1:436451505442:web:d262026a82787d3443e17b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()