// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUmWGsHsFfEURdyunHhIABcWvEs1mxJv8",
  authDomain: "drama-hive.firebaseapp.com",
  projectId: "drama-hive",
  storageBucket: "drama-hive.appspot.com",
  messagingSenderId: "39964310246",
  appId: "1:39964310246:web:049250d3a26a98208bd927",
  measurementId: "G-P73WV0TE3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);