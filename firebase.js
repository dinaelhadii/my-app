// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
<<<<<<< HEAD
import { 
  getFirestore, collection, getDocs, onSnapshot,
  addDoc,
  Firestore
 } from 'firebase/firestore';
 import { Constants } from "expo-constants";
=======
>>>>>>> parent of 9033d0d (Bewertungen beziehen sich jetzt auf ein einzelnes Item und nicht alle. Bewertungen können hinzugefügt werden.)
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };