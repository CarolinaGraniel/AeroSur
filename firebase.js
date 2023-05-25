
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAysmZx97hnD-ZVplB5XR5kfn18k3EZ44k",

  authDomain: "proyecto3-1d615.firebaseapp.com",

  projectId: "proyecto3-1d615",

  storageBucket: "proyecto3-1d615.appspot.com",

  messagingSenderId: "527441524560",

  appId: "1:527441524560:web:9af5d6ed857dc886449e55"

};


  // Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


//Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);