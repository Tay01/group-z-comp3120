// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAUsgwk-3ACyYAoFNL2YemD0lzMGAg94PI",
    authDomain: "group-z.firebaseapp.com",
    projectId: "group-z",
    storageBucket: "group-z.appspot.com",
    messagingSenderId: "387745457753",
    appId: "1:387745457753:web:4e295d1f200e6e2e417348",
    measurementId: "G-8MTJYL5NTT"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

console.log(app)
console.log(db)

console.log("-----------------")
console.log("SUCCESSFULLY CONNECTED TO DB")
console.log("-----------------")
