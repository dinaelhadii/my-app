// import firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZicFQFvgw7Ph9d-weq8lqTW1f93jGEBc",
  authDomain: "fir-auth-eab89.firebaseapp.com",
  projectId: "fir-auth-eab89",
  storageBucket: "fir-auth-eab89.appspot.com",
  messagingSenderId: "271311918832",
  appId: "1:271311918832:web:4bbce19913bd5c52c41435"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);

// Services initialisieren. Hier wird die Referenz zur Datenbank gespeichert.
const db = getFirestore();

// Referenz zur collection 'products', in welchem jedes Dokument einem Produkt entspricht.
const colRef = collection(db, 'products');

// Produkte in einem lokalen Array speichern
let products = [];
onSnapshot(colRef, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id })
  })
})

// Initialisieren des Authentifikations-Services von Firebase. Ermöglicht Login, Logout, SignUp, usw.
const auth = getAuth(app);

export { auth, colRef, products, db };