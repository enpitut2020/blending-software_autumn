import firebase from "firebase/app";
import "firebase/firestore";

if (!firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyCGGbrYJM04kDCkDwzFp8joE8c92_Ywss0",
    authDomain: "bookstore-walking-54b5a.firebaseapp.com",
    databaseURL: "https://bookstore-walking-54b5a.firebaseio.com",
    projectId: "bookstore-walking-54b5a",
    storageBucket: "bookstore-walking-54b5a.appspot.com",
    messagingSenderId: "783155585768",
    appId: "1:783155585768:web:0cae20420d29a07bb79f5d"
  };
  firebase.initializeApp(config);
}
export default firebase
