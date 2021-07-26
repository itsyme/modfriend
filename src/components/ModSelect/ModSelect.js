import logo from '../../modfriend.png';
import { Box, Button, Select, FormControl, InputLabel, MenuItem, TextField } from "@material-ui/core";
import styles from "./ModSelect.module.css";
import { Link, useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { firebase } from "@firebase/app"
import { useEffect, useRef, useState } from 'react';

function ModSelect() {
  const modulesRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [modules, setModules] = useState([])
  const history = useHistory();
  const axios = require('axios').default;

  async function updateModules(e) {

    e.preventDefault()

    try {
      setError("")
      setLoading(true)

    } catch {
      setError("modules not updated")
    }
    const arr = modulesRef.current.value.split(" ")
    setModules(arr)

    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("users").doc(uid).update({
      modules: arr,
      availableMods: arr
    })

    for (let i = 0; i < arr.length; i++) {
      var thisMod = arr[i];
      var dbCollection = db.collection("mods").doc(thisMod);
      var doc = await dbCollection.get();
      if (!doc.exists) {
        db.collection("mods").doc(thisMod).set({
          users: [uid]
        })
      } else {
        dbCollection.update({
          users: firebase.firestore.FieldValue.arrayUnion(uid)
        })
      }
    }

    setLoading(false)
    history.push("/MyProfile")
  }


  // async function addModules(e) {
  //   const uid = firebase.auth().currentUser?.uid;
  //   const db = firebase.firestore();
  //   const nusmodules = modulesRef.current.value
  //   let modules = nusmodules.split("&");
  //   let modulesTaken = [];
  //   for (let mod of modules) {
  //     if (mod.includes("?")) {
  //       mod = mod.split("?");
  //       mod = mod[1];
  //     }
  //     mod = mod.split("=", 1);
  //     await axios
  //       .get(`https://api.nusmods.com/v2/2020-2021/modules/${mod}.json`)
  //       .then(function (response) {
  //         if (response.status === 200 && !modulesTaken.includes(mod[0])) {
  //           modulesTaken.push(mod[0]);
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  //   db.collection("users").doc(uid).update({
  //     modules: modulesTaken,
  //     availableMods: modulesTaken
  //   })

  //   console.log(modulesTaken)
  // }

  return (
    <div>
      <Box className={styles.backButton}>
        <Button component={Link} to='/ProfileCreation'>
          Back
        </Button>
      </Box>
      <center>
        <img src={logo} alt="modFriend logo"
          height="138" width="375">
        </img>
        <h1>
          Type in your modules!
        </h1>
        <form className={styles.moduleBar}
          onSubmit={updateModules}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            required id="standard-required"
            label="Insert modules"
            helperText="eg CS1010S CS1101 MA1101R"
            inputRef={modulesRef} required
          />
          <Button variant="contained" style={{ background: "#1D5FB6", color: "white" }}
            type="submit">
            Submit
          </Button>
        </form>
      </center>
    </div>

  )
}

export default ModSelect;