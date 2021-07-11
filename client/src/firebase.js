import firebase from "firebase/app";
import "firebase/auth";
require("dotenv").config();

const app = firebase.initializeApp({
  apiKey: "AIzaSyCqSWGF1lZwBaIBDqJdFqjKBeadv0Nbst4",
  authDomain: "teams-clone-318209.firebaseapp.com",
  projectId: "teams-clone-318209",
  storageBucket: "teams-clone-318209.appspot.com",
  messagingSenderId: "1034435652546",
  appId: "1:1034435652546:web:564ec14ae3c644153b445b",
  measurementId: "G-4WLL6PD3C6",
});

export const auth = app.auth();
export default app;
