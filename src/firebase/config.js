import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS5x3-ry-cTbQ2bhx7px5oUyFHDaB0WLg",
  authDomain: "produs-ecommerce.firebaseapp.com",
  projectId: "produs-ecommerce",
  storageBucket: "produs-ecommerce.firebasestorage.app",
  messagingSenderId: "351307650740",
  appId: "1:351307650740:web:4d0c084e80841781b6e9e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)