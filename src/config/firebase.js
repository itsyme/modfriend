import firebase from 'firebase/app'
import 'firebase/auth'

export const app = firebase.initializeApp({
    apiKey: "AIzaSyCP9UzyrGU50s3--lTdmTzYTFne5_OKc8Q",
    authDomain: "modfriend-45039.firebaseapp.com",
    projectId: "modfriend-45039",
    storageBucket: "modfriend-45039.appspot.com",
    messagingSenderId: "821933252971",
    appId: "1:821933252971:web:dadd79001ad88f38f5ac2e",
    measurementId: "G-H81S106QGZ"
});




/*const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});*/

export const auth = app.auth()

export default app
