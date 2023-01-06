// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, collection, getDocs, onSnapshot,
  addDoc,
  Firestore
 } from 'firebase/firestore';
 import { Constants } from "expo-constants";
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

export default app;

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'products');

// get collection data
let products = [];

/* getDocs(colRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id })
    })
    console.log(products);
    //reviews = products.map((item) => {return item.reviews});
  })
  .catch(err => {
    console.log(err.message)
  }) */

onSnapshot(colRef, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id })
  })
  console.log(products);
})

  // get review collection data
let reviews = [];

/* getDocs(revRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      reviews.push({ ...doc.data(), id: doc.id })
    })
    console.log(reviews);
  })
  .catch(err => {
    console.log(err.message)
  }) */


  
const auth = getAuth(app);

export { auth, colRef, products, db };