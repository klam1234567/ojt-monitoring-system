import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore"
import "firebase/compat/storage"

import swal from "sweetalert2"

const firebaseConfig = {
  apiKey: "AIzaSyCdrNFkMEBLHqinww8lQE5i2tMvYeWsIHg",
  authDomain: "ojt-monitoring-system.firebaseapp.com",
  projectId: "ojt-monitoring-system",
  storageBucket: "ojt-monitoring-system.appspot.com",
  messagingSenderId: "270373481852",
  appId: "1:270373481852:web:220ece83711e0acb8948f9",
  measurementId: "G-8MQVSYHT3C",
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

const updateDocument = async (collectionName, config, id) => {
  try {
    const updateRef = doc(db, collectionName, id)

    await updateDoc(updateRef, {
      ...config,
    }).then(() => {
      swal.fire({
        title: "Successfully Updated",
        text: "click ok to continue",
        icon: "success",
      })
    })
  } catch (e) {
    console.log(e)
  }
}

const deleteUserAuth = (id) => auth.currentUser.delete(id)

const deleteDocument = async (collection, docId) =>
  await deleteDoc(doc(db, collection, docId))

const saveDoc = async (data, collectionName) => {
  try {
    const dbRef = collection(db, collectionName)
    const coordinatorDatas = await addDoc(dbRef, data)

    return coordinatorDatas
  } catch (e) {
    console.log(e)
  }
}

const registerUser = async (email, password, status) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    if (userCredential) {
      userCredential.user.displayName = status
    }

    return userCredential
  } catch (e) {
    switch (e.code) {
      case "auth/email-already-in-use":
        swal.fire({
          title: "Oops!",
          text: "email is already in use please try again",
          icon: "warning",
        })
        break
      default:
        return
    }
  }
}

export {
  app,
  registerUser,
  saveDoc,
  db,
  auth,
  deleteDocument,
  deleteUserAuth,
  updateDocument,
}
