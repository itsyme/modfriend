import firebase from "firebase";

export const config = {
    apiKey: "AIzaSyA-jz1kUQWoJujrWWzv6yXy2evzvrgNU3I",
    authDomain: "modfriend-4fed7.firebaseapp.com",
    projectId: "modfriend-4fed7",
    storageBucket: "modfriend-4fed7.appspot.com",
    messagingSenderId: "621115199306",
    appId: "1:621115199306:web:bfd4b6244f89cc45ed7bb3"
};
/*export const config = {
    apiKey: "AIzaSyCP9UzyrGU50s3--lTdmTzYTFne5_OKc8Q",
    authDomain: "modfriend-45039.firebaseapp.com",
    projectId: "modfriend-45039",
    storageBucket: "modfriend-45039.appspot.com",
    messagingSenderId: "821933252971",
    appId: "1:821933252971:web:dadd79001ad88f38f5ac2e",
    measurementId: "G-H81S106QGZ"
};*/

const myApp = firebase.initializeApp(config);
export const auth = myApp.auth();
//export const firestore = firebase.firestore();

