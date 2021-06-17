import React, { useContext, useState, useEffect } from "react"
import firebase from "@firebase/app"

const UserContext = React.createContext()
//const db = firebase.firestore()

export function NewUser() {
    return useContext(UserContext)
  }

/*export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState()
    const [name, setName] = useState()

    function addEmail(email) {
        return setEmail(email)  
    }

    function addName(name) {
        return setName(name)
    }

    function addUser(e) {
        e.preventDefault();
        const userRef = db.collection("users").add({
        name: Object.assign({}, addName),
        email: Object.assign({}, addEmail),
        faculty: ""
      }); 
    }

    const value = {
        addUser,
        addName,
        addEmail
      }
     
      return (
        <UserContext.Provider value={value}> 
        {!loading && children}
        </UserContext.Provider>
      );
} */

export default UserContext; 