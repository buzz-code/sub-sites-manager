import firebase from "firebase/app";
import "firebase/database";

let config = {
    apiKey: "XXX",
    authDomain: "XXX.firebaseapp.com",
    databaseURL: "https://XXX.europe-west1.firebasedatabase.app",
    projectId: "XXX",
    storageBucket: "XXX.appspot.com",
    messagingSenderId: "XXX",
    appId: "XXX"
};

firebase.initializeApp(config);

export default firebase.database();
