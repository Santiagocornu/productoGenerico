// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHJKDjf_CKyS7opJbPuS7CjaEKooYoXA0",
  authDomain: "productogenerico-1a3f3.firebaseapp.com",
  projectId: "productogenerico-1a3f3",
  storageBucket: "productogenerico-1a3f3.firebasestorage.app",
  messagingSenderId: "428041915077",
  appId: "1:428041915077:web:64fc182e7227e4d6f0beac",
  measurementId: "G-KGZVHB2810"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const productosRef = collection(db, 'productos');

export { db,productosRef };