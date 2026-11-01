import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  inMemoryPersistence,
  type Auth,
} from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    process.env.FIREBASE_API_KEY ||
    "",
  authDomain: "shikshaelite-e89c4.firebaseapp.com",
  projectId: "shikshaelite-e89c4",
  storageBucket: "shikshaelite-e89c4.firebasestorage.app",
  messagingSenderId: "297456708134",
  appId: "1:297456708134:web:fe9869e8f090082ed94e7",
  measurementId: "G-78PXBNG2FC",
};

const app: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

const db: Firestore = getFirestore(app);

let auth: Auth;
try {
  auth = getAuth(app);
} catch {
  if (typeof window !== "undefined") {
    auth = initializeAuth(app, {
      persistence: browserLocalPersistence,
    });
  } else {
    auth = initializeAuth(app, {
      persistence: inMemoryPersistence,
    });
  }
}

const storage: FirebaseStorage = getStorage(app);

export { app, db, auth, storage };
