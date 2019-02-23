import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";



// Initialize Firebase
var config = {
    apiKey: "AIzaSyCXfrxMmcqKhNZ-WaEcvFbAXXO7rb3qk1s",
    authDomain: "chat-react-a2eb5.firebaseapp.com",
    databaseURL: "https://chat-react-a2eb5.firebaseio.com",
    projectId: "chat-react-a2eb5",
    storageBucket: "chat-react-a2eb5.appspot.com",
    messagingSenderId: "178126631194"
  };
  firebase.initializeApp(config);


export default firebase;