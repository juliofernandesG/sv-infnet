import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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

// Inicializar o app do Firebase
const app = initializeApp(firebaseConfig);

// Obter uma instância de autenticação
const auth = getAuth(app);

export default auth;
