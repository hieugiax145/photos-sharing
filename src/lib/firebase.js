// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb-V6ZUA3E9LpgflnkTgqdgSDz8kJoPJQ",
  authDomain: "photo-sharing-8ff5a.firebaseapp.com",
  projectId: "photo-sharing-8ff5a",
  storageBucket: "photo-sharing-8ff5a.appspot.com",
  messagingSenderId: "519646728140",
  appId: "1:519646728140:web:83f18fabf25c17b7305769",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
