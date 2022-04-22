import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

import firebaseConfig from "lib/firebaseConfig";

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const storage = app.storage();

const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
const increment = firebase.firestore.FieldValue.increment;

// auth provider/s
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, storage, serverTimestamp, increment, googleAuthProvider };
export default db;
