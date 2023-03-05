// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB63-zbZgxesCdTxEBgZgFQi4ru2ooPVYA',
  authDomain: 'image-finder-3d3f3.firebaseapp.com',
  projectId: 'image-finder-3d3f3',
  storageBucket: 'image-finder-3d3f3.appspot.com',
  messagingSenderId: '505163257122',
  appId: '1:505163257122:web:445e215add28561c35417b',
  measurementId: 'G-7FDFBNX86L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
