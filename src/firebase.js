import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDqQNJiPGLz0DtUyWvIhJvdvv47WlYrYAo",
    authDomain: "fakebook-march.firebaseapp.com",
    databaseURL: "https://fakebook-march-default-rtdb.firebaseio.com",
    projectId: "fakebook-march",
    storageBucket: "fakebook-march.appspot.com",
    messagingSenderId: "421387606624",
    appId: "1:421387606624:web:a2624d7716855ed5204105",
    measurementId: "G-92DVVCKVED"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;