import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWCtwf0QSGw4Dj3KmT6QDljuPWTUzXNB8",
  authDomain: "chuck-norris-7e5fa.firebaseapp.com",
  projectId: "chuck-norris-7e5fa",
  storageBucket: "chuck-norris-7e5fa.firebasestorage.app",
  messagingSenderId: "579351542890",
  appId: "1:579351542890:web:1b8c7263d8708a0a8d1e13",
  measurementId: "G-H64F9TXST5",
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { analytics };
export const auth = getAuth(app);
