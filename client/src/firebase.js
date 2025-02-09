// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "covercraftai.firebaseapp.com",
    projectId: "covercraftai",
    storageBucket: "covercraftai.firebasestorage.app",
    messagingSenderId: "148026516378",
    appId: "1:148026516378:web:0507e38d1ce80f3bca5023",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);