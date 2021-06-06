import firebaseConfig from './firebase'
import firebase from 'firebase'

export const authMethods = {
    // firebase helper methods go here... 
    signup: (email, password, setErrors, setToken) => {
        firebase.auth().createUserWithEmailAndPassword(email,password) 
        .then( async res => {
            const token = await Object.entries(res.user)[5][1].b
              //set token to localStorage 
              await localStorage.setItem('token', token)
              setToken(window.localStorage.token)
                console.log(res)
          })
          .catch(err => {
            console.error(err)
          })
        },
        signin: (email, password, setErrors, setToken) => {
            //change from create users to...
            firebase.auth().signInWithEmailAndPassword(email,password) 
              //everything is almost exactly the same as the function above
              .then( async res => {
                const token = await Object.entries(res.user)[5][1].b
                  //set token to localStorage 
                  await localStorage.setItem('token', token)
                  setToken(window.localStorage.token)
                    console.log(res)
              })
              .catch(err => {
                setErrors(prev => ([...prev, err.message]))
              })
            },
    signout: (email, password) => {
  
      },
    }