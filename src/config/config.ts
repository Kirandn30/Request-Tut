// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions } from 'firebase/functions';
 import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3bDuEJjjyCphvl1260bpdblpN0Dy6tmc",
  authDomain: "learning-74315.firebaseapp.com",
  projectId: "learning-74315",
  storageBucket: "learning-74315.appspot.com",
  messagingSenderId: "209327238434",
  appId: "1:209327238434:web:b17708e476a38b9471497b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
export const auth = getAuth(app);
export const db = getFirestore(app);