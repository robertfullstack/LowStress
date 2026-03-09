import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDlIy0B3FZ2Usw8NSz9R9DpZ7QldUTHax8",
  authDomain: "mindrest-appmobile.firebaseapp.com",
  databaseURL: "https://mindrest-appmobile-default-rtdb.firebaseio.com",
  projectId: "mindrest-appmobile",
  storageBucket: "mindrest-appmobile.appspot.com",
  messagingSenderId: "350068143520",
  appId: "1:350068143520:web:0006cf5aec5987c76da0c5",
  measurementId: "G-ZXTXE1SCYQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();