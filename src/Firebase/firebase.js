import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBP9H3mLn7Nz8NeCo4Rve87YszflMshZ8",
  authDomain: "realtor-e7363.firebaseapp.com",
  projectId: "realtor-e7363",
  storageBucket: "realtor-e7363.appspot.com",
  messagingSenderId: "960865969593",
  appId: "1:960865969593:web:9fde225122d9555ec00268"

};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };



