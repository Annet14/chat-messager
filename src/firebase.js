import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onChildAdded } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC0yTP5Z-Wi8fVlidMZbS9gZh3axuZj20g",
  authDomain: "chat-48bc6.firebaseapp.com",
  projectId: "chat-48bc6",
  storageBucket: "chat-48bc6.firebasestorage.app",
  messagingSenderId: "550698525303",
  appId: "1:550698525303:web:880d661f7cec23d8841c72",
  measurementId: "G-X683N9XP7Y"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onChildAdded };