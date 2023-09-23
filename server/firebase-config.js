const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth, browserSessionPersistence } = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyAyTQ6sCHSGKsW25nap_ShyWSUs0WWkJ3s",
    authDomain: "power-pals.firebaseapp.com",
    projectId: "power-pals",
    storageBucket: "power-pals.appspot.com",
    messagingSenderId: "204109330286",
    appId: "1:204109330286:web:edee4899ca87320028f37f",
    measurementId: "G-P1DWEKBDJ5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Set the Auth persistence to SESSION
try {
    auth.setPersistence(browserSessionPersistence);
} catch (err) {
    console.error("Could not set Auth persistence", err);
}

export { db, auth };
