import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  // Remplacez avec vos propres clés Firebase
  apiKey: "AIzaSyDKI8Aj3fDeHgRox_7fD8SmlAt9IeRj0s0",
  authDomain: "ctf2025-5717b.firebaseapp.com",
  projectId: "ctf2025-5717b",
  storageBucket: "ctf2025-5717b.firebasestorage.app",
  messagingSenderId: "53200346545",
  appId: "1:53200346545:web:e9d23cc241f3caa4093190",
  measurementId: "G-TVK6SZ5GC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Vérification de l'initialisation
console.log('Firebase initialisé avec succès');
console.log('Auth:', auth);
console.log('Firestore:', db); 