import logo from '../../modfriend.png';
import { Button, FormControlLabel, Switch } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import {useHistory} from 'react-router-dom';


import React, { useState } from 'react';
import { firebase } from "@firebase/app";

function Matching() {
  const history = useHistory();
  const [error, setError] = useState('')
  const [state, setState] = React.useState({
    //checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("users").doc(uid).update({ 
      availability: !state.checkedB
    })
    console.log(!state.checkedB)
  };

  async function handleMatch(e) {
    e.preventDefault();
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const allUsers = db.collection("users");
    const userMods = (await allUsers.doc(uid).get()).data().modules;
    const mods = db.collection("mods");
    const userMatches = (await allUsers.doc(uid).get()).data().matches;
    console.log(state.checkedB)

    if (state.checkedB === false) {
      setError("cannot match")
    } else {
    
    for (let i = 0; i < userMods.length; i++) {
      var thisMod = userMods[i];
      var matchMod = (await mods.doc(thisMod).get()).data().users;
      var copyUsers = []

      for (let j = 0; j < matchMod.length; j++) {
        var thisUser = matchMod[j];
        var userAvailability = true
        
        allUsers.doc(thisUser).get().then((doc) => {
          if (doc.exists) {
            userAvailability = doc.data().availability
          }
        })

        if (thisUser === uid) continue;

        if (userMatches.includes(thisUser)) continue;

        if (userAvailability != true) continue;

        copyUsers.push(thisUser);
        
      }

      if (copyUsers.length < 1 ) continue;

      if (copyUsers.length === 0) {
        setError("no matches found")
      } 

      var result = copyUsers[Math.floor(Math.random() * copyUsers.length)];



      allUsers.doc(uid).update({
        matches: firebase.firestore.FieldValue.arrayUnion(result),
        availability: false
      })

      allUsers.doc(result).update({
        matches: firebase.firestore.FieldValue.arrayUnion(uid),
        availability: false
      })

    }

    alert("Matching Complete!")
    history.push("/Chat")

  }
}

    return (
        <div>
          <center>
          <img src = {logo} alt = "modFriend logo" 
          height = "200" width = "200">
          </img>
          <p />
          <h1>
              Welcome to modFriend!
          </h1>
          {error && <Alert severity="error">{error}</Alert>}
          <Button onClick={handleMatch} variant = "contained" style = {{background: "#4952ff", color: "white"}}>
              Match!
            </Button>
            <p />
          
            <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Toggle Availability"
      />
          </center>

        </div>
    )
}

export default Matching;