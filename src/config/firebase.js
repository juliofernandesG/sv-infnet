import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore'; 
const firebaseConfig = {
  apiKey: "AIzaSyCsFafbdto2Y9uXjBN1ZaL-UgwgrLl4dwM",
  authDomain: "sistema-de-vendas-ee2e3.firebaseapp.com",
  databaseURL: "https://sistema-de-vendas-ee2e3-default-rtdb.firebaseio.com",
  projectId: "sistema-de-vendas-ee2e3",
  storageBucket: "sistema-de-vendas-ee2e3.appspot.com",
  messagingSenderId: "860981329458",
  appId: "1:860981329458:web:b12e2df9145bf6210f462b",
  measurementId: "G-W9WD8GRMQB"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, collection }