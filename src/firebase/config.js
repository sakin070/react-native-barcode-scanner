// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyALopiGDsGbNibm8v6U0rMH4zRREKzHfrA",
  authDomain: "ess-barcode-scanner.firebaseapp.com",
  projectId: "ess-barcode-scanner",
  storageBucket: "ess-barcode-scanner.appspot.com",
  messagingSenderId: "8182786024",
  appId: "1:8182786024:web:f73a96ca4fe9ee560fa65d",
  measurementId: "G-1XC8E993MD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// const analytics = getAnalytics(app);

export {auth,db};
