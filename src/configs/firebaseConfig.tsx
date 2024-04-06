
import { initializeApp } from "firebase/app";
import {getAuth, initializeAuth} from "firebase/auth";
import {getDatabase} from 'firebase/database'
const firebaseConfig = {
  apiKey: "AIzaSyAXzTWPeZvZAE3x-kYPqO1XcN4i0xgHcdI",
  authDomain: "complexivo-fc998.firebaseapp.com",
  projectId: "complexivo-fc998",
  storageBucket: "complexivo-fc998.appspot.com",
  messagingSenderId: "867211720734",
  appId: "1:867211720734:web:cacf971496cb303fe2560f",
  databaseURL:"https://complexivo-fc998-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
export const auth=initializeAuth(app);
export const dbRealTime=getDatabase(app)