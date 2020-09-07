import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBw1mhR9sMW50bY8o0w0FqqB73jalZJUrw",
    authDomain: "twitter-clone-e9200.firebaseapp.com",
    databaseURL: "https://twitter-clone-e9200.firebaseio.com",
    projectId: "twitter-clone-e9200",
    storageBucket: "twitter-clone-e9200.appspot.com",
    messagingSenderId: "570656067798",
    appId: "1:570656067798:web:6784e97bf54defc1d63977",
    measurementId: "G-4C627ZD37X"
  };
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const userRef = firebaseApp.database().ref("users");  
export const postRef = firebaseApp.database().ref("posts");
export const storageRef = firebaseApp.storage();