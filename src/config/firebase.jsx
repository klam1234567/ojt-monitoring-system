import firebase from "firebase/compat/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "firebase/compat/storage";

import swal from "sweetalert2";

const firebaseConfig = {
  apiKey: "AIzaSyCdrNFkMEBLHqinww8lQE5i2tMvYeWsIHg",
  authDomain: "ojt-monitoring-system.firebaseapp.com",
  projectId: "ojt-monitoring-system",
  storageBucket: "ojt-monitoring-system.appspot.com",
  messagingSenderId: "270373481852",
  appId: "1:270373481852:web:220ece83711e0acb8948f9",
  measurementId: "G-8MQVSYHT3C",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const saveData = async (data, collectionName) => {
  try {
    const dbRef = collection(db, collectionName);
    const coordinatorDatas = await addDoc(dbRef, data);

    return coordinatorDatas;
  } catch (e) {
    console.log(e);
  }
};

const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential;
  } catch (e) {
    switch (e.code) {
      case "auth/email-already-in-use":
        swal.fire({
          title: "Oops!",
          text: "email is already in use please try again",
          icon: "warning",
        });
        break;
    }
  }
};

export { app, registerUser, saveData };
