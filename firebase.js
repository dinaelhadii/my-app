// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, collection, getDocs, onSnapshot,
  addDoc,
  Firestore
 } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZicFQFvgw7Ph9d-weq8lqTW1f93jGEBc",
  authDomain: "fir-auth-eab89.firebaseapp.com",
  projectId: "fir-auth-eab89",
  storageBucket: "fir-auth-eab89.appspot.com",
  messagingSenderId: "271311918832",
  appId: "1:271311918832:web:4bbce19913bd5c52c41435"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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