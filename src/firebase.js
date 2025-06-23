// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY ,
  authDomain: "mern-estate-e124e.firebaseapp.com",
  projectId: "mern-estate-e124e",
  storageBucket: "mern-estate-e124e.firebasestorage.app",
  messagingSenderId: "745504665855",
  appId: "1:745504665855:web:c05cdf0f8948d52a179cca",
  measurementId: "G-E77Z71H993"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);