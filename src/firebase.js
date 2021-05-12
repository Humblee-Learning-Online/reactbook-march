import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDqQNJiPGLz0DtUyWvIhJvdvv47WlYrYAo",
    authDomain: "fakebook-march.firebaseapp.com",
    databaseURL: "https://fakebook-march-default-rtdb.firebaseio.com",
    projectId: "fakebook-march",
    storageBucket: "fakebook-march.appspot.com",
    messagingSenderId: "421387606624",
    appId: "1:421387606624:web:750b7f28fde4cb82204105",
    measurementId: "G-HGQ58YHR7K"
};

firebase.initializeApp(firebaseConfig);

export default firebase;