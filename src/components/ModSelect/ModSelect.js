import logo from '../../modfriend.png';
import { Box, Button, TextField } from "@material-ui/core";
import styles from "./ModSelect.module.css";
import { Link, useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { firebase } from "@firebase/app"
import { useRef, useState } from 'react';
import Loading from '../Loading/Loading';

function ModSelect() {
    const modulesRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    //const [modules, setModules] = useState([])
    const history = useHistory();
  

    async function updateModules(e) {
      
        e.preventDefault()
    
        try {
          setError("")
          setLoading(true)
    
        } catch {
          setError("modules not updated")
        } 
            const arr = modulesRef.current.value.split(" ")
            //setModules(arr)

            const uid = firebase.auth().currentUser?.uid;
            const db = firebase.firestore();
            db.collection("users").doc(uid).update({ 
                modules: arr,
                availableMods: arr
            })

            for (let i = 0; i < arr.length; i++) {
              var thisMod = arr[i];
              var dbCollection = db.collection("mods").doc(thisMod);
              var doc =  await dbCollection.get();
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

    return (
      loading ? <Loading /> :
        <div>
            <Box className = {styles.backButton}>
                <Button component = {Link} to = '/ProfileCreation'>
                    Back
                </Button>
            </Box>  
            <center>
          <img src = {logo} alt = "modFriend logo" 
          height = "138" width = "375">
          </img>
          <h1>
              Type in your modules!
          </h1>
          <form className = {styles.moduleBar} 
          onSubmit={updateModules}>
               {error && <Alert severity="error">{error}</Alert>}
          <TextField
          required 
          id="standard-required" 
          label="Insert modules"
          helperText="eg CS1010S CS1101 MA1101R"
          inputRef={modulesRef} 
        />
          <Button variant = "contained" style = {{background: "#1D5FB6", color: "white"}} 
            type="submit">
              Submit
            </Button>
            </form>
          </center>
        </div>

    )
}

export default ModSelect;