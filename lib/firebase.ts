import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  browserLocalPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "shikshaelite-e89c4.firebaseapp.com",
  projectId: "shikshaelite-e89c4",
  storageBucket: "shikshaelite-e89c4.firebasestorage.app",
  messagingSenderId: "297456708134",
  appId: "1:297456708134:web:fe9869e8f090082ed94e7",
  measurementId: "G-78PXBNG2FC",
};

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});

const storage = getStorage(app);

export { app, db, auth, storage };