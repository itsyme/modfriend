import logo from '../../modfriend.png';
import { Box, Button, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import styles from "./ModSelect.module.css";
import { Link } from 'react-router-dom';

import { firebase } from "@firebase/app"
import { useEffect } from 'react';

function ModSelect() {
    const modules = [
        'CS1010S',
        'CS1101',
        'MA1101R'
    ]
        /*useEffect(() => {
            const uid = firebase.auth().currentUser?.uid;
            const db = firebase.firestore();
            db.collection("users").doc(uid).update({ 
                modules: modules
            })
        
        })*/

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
              Select your modules!
          </h1>
          <FormControl>
              <InputLabel>Modules</InputLabel>
              <Select multiple className = {styles.moduleBar}
              value = {modules}>
                  {modules.map((mod) => (
            <MenuItem key={mod} value={mod}>
              {mod}
            </MenuItem>
                  ))}

              </Select>
          </FormControl>
          <Button variant = "contained" style = {{background: "#4952ff", color: "white"}} 
            type="submit">
              Login
            </Button>
          
          </center>
        </div>

    )
}

export default ModSelect;