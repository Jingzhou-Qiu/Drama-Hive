import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { createContext } from 'react';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const firestore = getFirestore(app);
const storage = getStorage(app);


const FirebaseContext = createContext();
const addData = async (collectionName, data) => {
  try {
    const collectionRef = collection(firestore, collectionName);
    
    const docRef = await addDoc(collectionRef, data);
    
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const getDataWithFilter = async (collectionName, field, operator, value) => {
  try {
    const collectionRef = collection(firestore, collectionName);
    const q = query(collectionRef, where(field, operator, value));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (e) {
    console.error('Error retrieving documents: ', e);
    throw e;
  }
};



export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, firestore, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, addData, getDataWithFilter, app, auth, firestore, storage, firebaseConfig }