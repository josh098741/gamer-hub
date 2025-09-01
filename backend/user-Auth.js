// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
 } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAF3qhGlSRu-9NRHXg5lsq-6s-WXtH93q4",
    authDomain: "infinity-quest-labs.firebaseapp.com",
    projectId: "infinity-quest-labs",
    storageBucket: "infinity-quest-labs.firebasestorage.app",
    messagingSenderId: "974012879701",
    appId: "1:974012879701:web:5fb48a06fb56710af8d5dc",
    measurementId: "G-CTJHK3925R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Handle signup
const submit = document.getElementById('submit');
submit.addEventListener("click", function(event) {
event.preventDefault();

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    alert("Signup successful! Welcome " + user.email);
    window.location.href = "/init-website/frontend/public/dashboard.html";
    })
    .catch((error) => {
    alert(error.message);
    });
});

const googleLoginBtn = document.getElementById("google-login-btn");
googleLoginBtn.addEventListener("click",(event) => {
    event.preventDefault();

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        alert("Google Login Succesful! Welcome " + user.displayName);
        window.location.href = "/init-website/frontend/public/dashboard.html";
    })
    .catch((error) => {
        console.log(error);
        alert(error.message);
    });
});