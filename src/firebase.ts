import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2RXJuBhep8Osm2OpWJb1uOdznwSkiYn4",
  authDomain: "api-individual.firebaseapp.com",
  projectId: "api-individual",
  storageBucket: "api-individual.firebasestorage.app",
  messagingSenderId: "90275146566",
  appId: "1:90275146566:web:cd275d4412f7ce6e5c5347",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);