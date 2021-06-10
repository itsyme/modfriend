import logo from '../../modfriend.png';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Paper, TextField } from '@material-ui/core';
import styles from "./ProfileCreationForm.module.css";
import { NewUser } from '../../contexts/UserContext'

import firebase from 'firebase';

export default function ProfileCreationForm() {
  const nameRef = useRef()
  const facultyRef = useRef()
  const history = useHistory();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { addName } = NewUser()

  async function createProfile(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await addName(nameRef.current.value)
    } catch {
      setError("profile not created")
    } 

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
          <form className = {styles.profileCreationForm} onSubmit={createProfile}>
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
