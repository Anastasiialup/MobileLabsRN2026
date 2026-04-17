import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyCD9izCXgJP3lIaWj4PQBn97Y5tOd7JqRU",
    authDomain: "mobilelab6-1801d.firebaseapp.com",
    projectId: "mobilelab6-1801d",
    storageBucket: "mobilelab6-1801d.firebasestorage.app",
    messagingSenderId: "644517611282",
    appId: "1:644517611282:web:b29ae9d696b75bc50995cb",
    measurementId: "G-BTRVS36PFW"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { auth, db };
