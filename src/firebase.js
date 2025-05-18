// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVA_QgT8NgFWxzw8dRU3aAY8VTs0iu5YA",
  authDomain: "taskmaster-f1ea7.firebaseapp.com",
  projectId: "taskmaster-f1ea7",
  storageBucket: "taskmaster-f1ea7.appspot.com",
  messagingSenderId: "667640279488",
  appId: "1:667640279488:web:80de7f4b0753867a8ed825",
  measurementId: "G-H8QMFWGRGG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
