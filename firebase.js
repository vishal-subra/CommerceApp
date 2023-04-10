import {initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import auth from '@react-native-firebase/auth';
// import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";

import {getFirestore, collection, getDocs, addDoc} from 'firebase/firestore'

// Create a root reference

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQSDgemvhcNMUnH9V8efUnA5SP0vWVvgc",
  authDomain: "grocery-3a6b7.firebaseapp.com",
  projectId: "grocery-3a6b7",
  storageBucket: "grocery-3a6b7.appspot.com",
  messagingSenderId: "171919450631",
  appId: "1:171919450631:web:ee653f591f459c2a3100a2",
  measurementId: "G-9VCBJ7NV9H"
};

// Initialize Firebase
const firebase  = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();


export { firebase ,auth ,db, storage};