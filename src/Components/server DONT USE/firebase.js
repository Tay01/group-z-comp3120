// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

function StartFirebase(){
  const firebaseConfig = {
      apiKey: "AIzaSyAUsgwk-3ACyYAoFNL2YemD0lzMGAg94PI",
      authDomain: "group-z.firebaseapp.com",
      projectId: "group-z",
      storageBucket: "group-z.appspot.com",
      messagingSenderId: "387745457753",
      appId: "1:387745457753:web:4e295d1f200e6e2e417348",
      measurementId: "G-8MTJYL5NTT",
      databaseURL:"group-z-default-rtdb.asia-southeast1.firebasedatabase.app"
    };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  return getDatabase(app)
};

export default StartFirebase;