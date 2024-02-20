import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBTccjX-6SKjlfRnKvakNgK0KsZNotyhvY",
  authDomain: "monobank-widget.firebaseapp.com",
  projectId: "monobank-widget",
  storageBucket: "monobank-widget.appspot.com",
  messagingSenderId: "382519065095",
  appId: "1:382519065095:web:6162427a9320fee7a888a2"
};

export const firebaseApp = initializeApp(firebaseConfig);


const db = getFirestore(firebaseApp)

export const reviews = collection(db, 'reviews')
