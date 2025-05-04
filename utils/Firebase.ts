// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtRjxVtG4BffoJMMGsWTWxMMiTtDttmZY",
  authDomain: "virofund-real.firebaseapp.com",
  projectId: "virofund-real",
  storageBucket: "virofund-real.firebasestorage.app",
  messagingSenderId: "993186491302",
  appId: "1:993186491302:web:9b5f5093d3445839863d67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, provider, db };
