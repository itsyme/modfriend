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
            console.log(modules)

            const uid = firebase.auth().currentUser?.uid;
            const db = firebase.firestore();
            const modRef = db.collection("users").doc(uid).update({ 
                modules: modules
            })

            setLoading(false)
    //history.push("/MyProfile")
        }

    return (
        <div>
            <Box className = {styles.backButton}>
                <Button component = {Link} to = '/ProfileCreation'>
                    Back
                </Button>
            </Box>  
            <center>
          <img src = {logo} alt = "modFriend logo" 
          height = "200" width = "200">
          </img>
          <h1>
              Type in your modules!
          </h1>
          <form className = {styles.moduleBar} 
          onSubmit={updateModules}>
               {error && <Alert severity="error">{error}</Alert>}
          <TextField
          id="standard-helperText"
          label="Insert modules"
          helperText="eg CS1010S CS1101 MA1101R"
          inputRef={modulesRef} required
        />
          <Button variant = "contained" style = {{background: "#4952ff", color: "white"}} 
            type="submit">
              Login
            </Button>
            </form>
          </center>
        </div>

    )
}

export default ModSelect;