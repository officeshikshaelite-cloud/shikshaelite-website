import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  inMemoryPersistence,
  type Auth,
} from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const getFirebaseConfig = () => {
  const apiKey =
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    process.env.FIREBASE_API_KEY ||
    "";

  return {
    apiKey,
    authDomain:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
      "shikshaelite-e89c4.firebaseapp.com",
    projectId:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
      "shikshaelite-e89c4",
    storageBucket:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      "shikshaelite-e89c4.firebasestorage.app",
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
      "297456708134",
    appId:
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
      "1:297456708134:web:fe9869e8f090082ed94e7",
    measurementId:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
      "G-78PXBNG2FC",
  };
};

function getFirebaseApp(): FirebaseApp {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0];
  }
  const config = getFirebaseConfig();
  if (!config.apiKey) {
    throw new Error(
      "Firebase API key is not configured. Please set NEXT_PUBLIC_FIREBASE_API_KEY in your environment variables."
    );
  }
  return initializeApp(config);
}

function getDb(): Firestore {
  const appInstance = getFirebaseApp();
  return getFirestore(appInstance);
}

function getAuthInstance(): Auth {
  const appInstance = getFirebaseApp();
  try {
    return getAuth(appInstance);
  } catch {
    if (typeof window !== "undefined") {
      return initializeAuth(appInstance, {
        persistence: browserLocalPersistence,
      });
    } else {
      return initializeAuth(appInstance, {
        persistence: inMemoryPersistence,
      });
    }
  }
}

function getStorageInstance(): FirebaseStorage {
  const appInstance = getFirebaseApp();
  return getStorage(appInstance);
}

function createLazyProxy<T extends object>(initializer: () => T): T {
  let cached: T | null = null;
  return new Proxy({} as T, {
    get(_target, prop, receiver) {
      if (!cached) {
        cached = initializer();
      }
      const val = Reflect.get(cached, prop, receiver);
      return typeof val === "function" ? val.bind(cached) : val;
    },
    set(_target, prop, value, receiver) {
      if (!cached) {
        cached = initializer();
      }
      return Reflect.set(cached, prop, value, receiver);
    },
    has(_target, prop) {
      if (!cached) {
        cached = initializer();
      }
      return Reflect.has(cached, prop);
    },
    ownKeys() {
      if (!cached) {
        cached = initializer();
      }
      return Reflect.ownKeys(cached);
    },
    getOwnPropertyDescriptor(_target, prop) {
      if (!cached) {
        cached = initializer();
      }
      return Reflect.getOwnPropertyDescriptor(cached, prop);
    },
  });
}

const app: FirebaseApp = createLazyProxy(getFirebaseApp);
const db: Firestore = createLazyProxy(getDb);
const auth: Auth = createLazyProxy(getAuthInstance);
const storage: FirebaseStorage = createLazyProxy(getStorageInstance);

export {
  app,
  db,
  auth,
  storage,
  getFirebaseApp,
  getDb,
  getAuthInstance,
  getStorageInstance,
  getFirebaseConfig,
};
