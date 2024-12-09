import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAEpd6TtW7G3pDRXIw242Aqk61GbHJv0ck",
    authDomain: "my-lead-ec3e9.firebaseapp.com",
    databaseURL: "https://my-lead-ec3e9.firebaseio.com",
    projectId: "my-lead-ec3e9",
    storageBucket: "my-lead-ec3e9.firebasestorage.app",
    messagingSenderId: "796465788377",
    appId: "1:796465788377:web:c4ddb4d0aebf74cb2155c8",
    measurementId: "G-0GPMPSVBEW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
