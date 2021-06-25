import logo from '../../modfriend.png';
import { Button, FormControlLabel, Switch } from "@material-ui/core";
import React from 'react';
import { firebase } from "@firebase/app";

function Matching() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  async function handleMatch(e) {
    e.preventDefault();
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const allUsers = db.collection("users");
    const userMods = (await allUsers.doc(uid).get()).data().modules;
    const mods = db.collection("mods");
    
    for (let i = 0; i < userMods.length; i++) {
      var thisMod = userMods[i];
      var matchMod = (await mods.doc(thisMod).get()).data().users;
      var copyUsers = []

      if (matchMod.length < 2) {
        continue;
      }

      for (let j = 0; j < matchMod.length; j++) {
        var thisUser = matchMod[j];
        if (thisUser !== uid) {
          copyUsers.push(thisUser);
        }
      }

      var result = copyUsers[Math.floor(Math.random() * copyUsers.length)];

      allUsers.doc(uid).update({
        matches: firebase.firestore.FieldValue.arrayUnion(result)
      })

      allUsers.doc(result).update({
        matches: firebase.firestore.FieldValue.arrayUnion(uid)
      })

    }

    alert("Matching Complete!")

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