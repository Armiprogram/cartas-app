
import { initializeApp } from "firebase/app";
import {getAuth, initializeAuth} from "firebase/auth";
import {getDatabase} from 'firebase/database'
const firebaseConfig = {
  apiKey: "AIzaSyAwfhbuYzzr5L1P2sdX6aTzQq8LVn_VQUM",
  authDomain: "farmacia-18e49.firebaseapp.com",
  projectId: "farmacia-18e49",
  storageBucket: "farmacia-18e49.appspot.com",
  messagingSenderId: "1002969940532",
  appId: "1:1002969940532:web:4255ba5977eeae1f85c061",
  databaseURL:"https://farmacia-18e49-default-rtdb.firebaseio.com/"
};
const app = initializeApp(firebaseConfig);
export const auth=initializeAuth(app);
export const dbRealTime=getDatabase(app)






