import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyCxM8Zxr4Essv350l3Wr6Zp2Deo-wNwoyY",
    authDomain: "solgram14.firebaseapp.com",
    projectId: "solgram14",
    storageBucket: "solgram14.appspot.com",
    messagingSenderId: "592624876378",
    appId: "1:592624876378:web:35c3bf4b2219d282389163",
    measurementId: "G-ZGWZ4E6JHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
const analytics = getAnalytics(app);