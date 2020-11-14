import firebase from 'firebase';

console.log('firebase');


const firebaseConfig = {
    apiKey: "AIzaSyAodUl-wg7JK7tNHyj0_Gg1tB4xEQjTsk8",
    authDomain: "master-class-com.firebaseapp.com",
    databaseURL: "https://master-class-com.firebaseio.com",
    projectId: "master-class-com",
    storageBucket: "master-class-com.appspot.com",
    messagingSenderId: "854633369027",
    appId: "1:854633369027:web:8e6b312a5005f295a3c176",
    measurementId: "G-YF2D83PT2N"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();;


export { db, auth, storage};