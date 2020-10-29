import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app'

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



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
