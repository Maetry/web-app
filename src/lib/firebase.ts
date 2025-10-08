// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPk5wpYvK15mCbVJW_8Q1TlV2MDtermBo",
  authDomain: "maetry.firebaseapp.com",
  projectId: "maetry",
  storageBucket: "maetry.firebasestorage.app",
  messagingSenderId: "601862402938",
  appId: "1:601862402938:web:5267ccc1de0b64d1c51cc3",
  measurementId: "G-NNZ61Y6M55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };