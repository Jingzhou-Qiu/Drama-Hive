import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { createContext } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyDXExwRQk28MWaI9jtIoYHLvGRaYlRSN-E",
    authDomain: "dramahive-2d5f7.firebaseapp.com",
    projectId: "dramahive-2d5f7",
    storageBucket: "dramahive-2d5f7.appspot.com",
    messagingSenderId: "167741254400",
    appId: "1:167741254400:web:17368d2d5364085bb3a1e5",
    measurementId: "G-HSH5C1LV69"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);


const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, firestore, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};