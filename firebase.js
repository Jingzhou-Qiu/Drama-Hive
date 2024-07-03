import { initializeApp } from 'firebase/app';
import '@firebase/auth';

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

export default app;