import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDCZiRULgcVzHOHCUBc-n9dXun1GxQqz3A",
  authDomain: "tooristor-b6626.firebaseapp.com",
  projectId: "tooristor-b6626",
  storageBucket: "tooristor-b6626.appspot.com",
  messagingSenderId: "847388446051",
  appId: "1:847388446051:web:cd655581bbd871c934d756",
  measurementId: "G-28QDJ1SKPL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)