import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";

export type FirebaseUserData = {
  uid: string;
  email: string | null;
  name: string | null;
};

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<FirebaseUserData> {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (!credential.user) {
    throw new Error("No se pudo registrar al usuario.");
  }

  await updateProfile(credential.user, {
    displayName: name,
  });

  return {
    uid: credential.user.uid,
    email: credential.user.email,
    name: credential.user.displayName || name,
  };
}

export async function loginUser(
  email: string,
  password: string
): Promise<FirebaseUserData> {
  const credential = await signInWithEmailAndPassword(auth, email, password);

  if (!credential.user) {
    throw new Error("No se pudo iniciar sesión.");
  }

  return {
    uid: credential.user.uid,
    email: credential.user.email,
    name: credential.user.displayName || credential.user.email,
  };
}

export async function logoutUser() {
  await signOut(auth);
}

export function subscribeAuthState(
  callback: (user: FirebaseUser | null) => void
) {
  return onAuthStateChanged(auth, callback);
}
