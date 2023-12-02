import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCE_c3k4Wk9fdkkJYgrWLvbPBWOVlwSHA0",
  authDomain: "chatgpt-messenger-d1f06.firebaseapp.com",
  projectId: "chatgpt-messenger-d1f06",
  storageBucket: "chatgpt-messenger-d1f06.appspot.com",
  messagingSenderId: "515031663400",
  appId: "1:515031663400:web:f1a060a57931b6841d461d",
};

const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
