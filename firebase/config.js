import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtIB7jG-8vUhsvgjNxvWDkRajYKoFrdp0",
  authDomain: "echo-9f6ea.firebaseapp.com",
  projectId: "echo-9f6ea",
  storageBucket: "echo-9f6ea.appspot.com",
  messagingSenderId: "1064311130616",
  appId: "1:1064311130616:web:546e59173c882fe6b62e0d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
