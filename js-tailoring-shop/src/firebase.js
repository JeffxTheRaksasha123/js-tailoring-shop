import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQeyS_JVLGapKrjATYxZTYDsg4SmZLo4Y",
  authDomain: "js-tailoring-shop.firebaseapp.com",
  projectId: "js-tailoring-shop",
  storageBucket: "js-tailoring-shop.firebasestorage.app",
  messagingSenderId: "679359420654",
  appId: "1:679359420654:web:f3f24f06542098bf4f3bff",
  measurementId: "G-B4SMH6KZDS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

export default app;