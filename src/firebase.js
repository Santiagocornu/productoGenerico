// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyA2iExDd7Mwt6nscGlXPQmA7rN9xDK4HbY",
  authDomain: "hofusushi-5b823.firebaseapp.com",
  projectId: "hofusushi-5b823",
  storageBucket: "hofusushi-5b823.firebasestorage.app",
  messagingSenderId: "561295602225",
  appId: "1:561295602225:web:2ccb1989c34ea10dc39b10",
  measurementId: "G-4S711G234N"};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const productosRef = collection(db, 'productos');

export { db,productosRef };