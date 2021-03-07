import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD_Vd9EML3pLBR6youz75V4fZjpwTQpCHs",
  authDomain: "messenger-clone-ba25a.firebaseapp.com",
  projectId: "messenger-clone-ba25a",
  storageBucket: "messenger-clone-ba25a.appspot.com",
  messagingSenderId: "541723103499",
  appId: "1:541723103499:web:59377a4a5a557389f6d20e",
  measurementId: "G-MC9H2H495N",
});

const db = firebaseApp.firestore();

export default db;
