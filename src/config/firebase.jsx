import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  setDoc,
  getDocs,
  FieldValue,
} from "firebase/firestore"
import "firebase/compat/storage"

import swal from "sweetalert2"

/**
 * connection between firebase and web application
 */
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
/**
 * connection between firebase and web application
 */

// updating specific document in firebase firestore
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

// deleting authenticated user
const deleteUserAuth = async (id) => await auth.currentUser.delete(id)

// deleting each specific document or data in the firebase firestore
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

// register new user each time the client inputs new data values in input fields
const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

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
  onSnapshot,
  query,
  setDoc,
  getDocs,
  collection,
  getFirestore,
  doc,
  app,
  registerUser,
  saveDoc,
  db,
  auth,
  deleteDocument,
  deleteUserAuth,
  updateDocument,
  signInWithEmailAndPassword,
  signOut,
  FieldValue,
}
