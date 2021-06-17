import logo from '../../modfriend.png';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Paper, TextField } from '@material-ui/core';
import styles from "./ProfileCreationForm.module.css";
//import { NewUser } from '../../contexts/UserContext'

import { firebase } from "@firebase/app"

export default function ProfileCreationForm() {
  const nameRef = useRef()
  const facultyRef = useRef()
  const history = useHistory();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([])
  //const { addName } = NewUser()

  async function CreateProfile(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)

    } catch {
      setError("profile not created")
    } 
      const uid = firebase.auth().currentUser?.uid;
      const db = firebase.firestore();
      db.collection("users").doc(uid).set({ 
      faculty: "computing",
      name: nameRef.current.value,
      modules: []
       })

    setLoading(false)
    history.push("/ModSelect")
  
  }

    return (
        <div>
            <p />
        <center>
          <img src = {logo} alt = "modFriend logo" 
          height = "200" width = "200">
          </img>
        <h1>
          Create Your Profile
        </h1>
        <Box display = "inline-block">
          <Paper elevation = {3}>
          <form className = {styles.profileCreationForm} onSubmit={CreateProfile}>
          <TextField 
          required id="standard-required" 
          label="Name"
          type="text"
          inputRef={nameRef} required
          />
          <p />
          <FormControl>
        <InputLabel>Year</InputLabel>
        <Select className = {styles.year}>
          <MenuItem>Year 1</MenuItem>
          <MenuItem>Year 2</MenuItem>
          <MenuItem>Year 3</MenuItem>
          <MenuItem>Year 4</MenuItem>
        </Select>
        </FormControl>
        <p />
        <FormControl>
        <InputLabel>Faculty</InputLabel>
        <Select className = {styles.faculty}>
          <MenuItem>Business and Accountancy</MenuItem>
          <MenuItem>Computing</MenuItem>
          <MenuItem>Dentistry</MenuItem>
          <MenuItem>Design and Environment</MenuItem>
          <MenuItem>Engineering</MenuItem>    
          <MenuItem>College of Humanities and Science</MenuItem>    
          <MenuItem>Law</MenuItem>
          <MenuItem>Medicine</MenuItem>
          <MenuItem>Music</MenuItem>
          <MenuItem>Pharmacy</MenuItem>
          <MenuItem>Nursing</MenuItem>
        </Select>
      </FormControl>
          <p />
          <TextField required id="standard-required" label="Re-enter Password"/>
          <p />
            <Button variant = "contained" style = {{background: "#4952ff", color: "white"}}
            type="submit"
            >
              Next
            </Button>
          
          </form>
          </Paper>
          </Box>
        </center>
        </div>
    )
}
