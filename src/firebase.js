// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYFptm5OBvOMp4zkPhjFbKGJlR9o2Wxfw",
  authDomain: "santinunhez-a58a5.firebaseapp.com",
  projectId: "santinunhez-a58a5",
  storageBucket: "santinunhez-a58a5.firebasestorage.app",
  messagingSenderId: "415360869379",
  appId: "1:415360869379:web:a7a2b89fdf5657c0425a36",
  measurementId: "G-5ZVGPPVWRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const productosRef = collection(db, 'productos');

export { db,productosRef };