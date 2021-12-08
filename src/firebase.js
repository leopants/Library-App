import firebase from "firebase/compat/app";
require("firebase/compat/auth");

const firebaseConfig = {
    apiKey: "AIzaSyCQ54DSqVGhgXe1j74m0dv7aWY3pLONH8Y",
    authDomain: "readingapp-bdd95.firebaseapp.com",
    projectId: "readingapp-bdd95",
    storageBucket: "readingapp-bdd95.appspot.com",
    messagingSenderId: "114425537459",
    appId: "1:114425537459:web:cdf1ded6015309bf2de1c6",
    measurementId: "G-KXPL7YWCMP",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export default app;
