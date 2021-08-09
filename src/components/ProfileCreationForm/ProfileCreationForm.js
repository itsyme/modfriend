import logo from '../../modfriend.png';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Paper, TextField } from '@material-ui/core';
import styles from "./ProfileCreationForm.module.css";
import { Alert } from '@material-ui/lab';
import { firebase } from "@firebase/app";

export default function ProfileCreationForm() {
  const nameRef = useRef();
  const history = useHistory();
  const [error, setError] = useState('')
  const [faculty, setFaculty] = useState("")
  const [year, setYear] = useState("")

  const handleYear = (event) => {
    setYear(event.target.value);
  };

  const handleFaculty = (event) => {
    setFaculty(event.target.value);
  };


  async function CreateProfile(e) {
    e.preventDefault()

    try {
      setError("")

    } catch {
      setError("profile not created")
    }
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("users").doc(uid).set({
      faculty: faculty,
      name: nameRef.current.value,
      year: year,
      modules: [],
      matches: [],
      availableMods: [],
      newFriend: []
    })

    console.log(faculty)
    history.push("/ModSelect")

  }

  return (
    <div>
      <p />
      <center>
        <img src={logo} alt="modFriend logo"
          height="138" width="375">
        </img>
        <h1 className={styles.white}>
          Create Your Profile
        </h1>
        <Box display="inline-block">
          <Paper elevation={3}>
            <form className={styles.profileCreationForm} onSubmit={CreateProfile}>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                required id="standard-required"
                label="Name"
                type="text"
                inputRef={nameRef}
              />
              <p />
              <FormControl>
                <InputLabel>Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={year}
                  onChange={handleYear}
                  className={styles.year}>
                  <MenuItem value={1}>Year 1</MenuItem>
                  <MenuItem value={2}>Year 2</MenuItem>
                  <MenuItem value={3}>Year 3</MenuItem>
                  <MenuItem value={4}>Year 4</MenuItem>
                </Select>
              </FormControl>
              <p />
              <FormControl>
                <InputLabel>Faculty</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={faculty}
                  onChange={handleFaculty}
                  className={styles.faculty} >
                  <MenuItem value={"Business"}>Business</MenuItem>
                  <MenuItem value={"College of Humanities and Science"}>College of Humanities and Science</MenuItem>
                  <MenuItem value={"Computing"}>Computing</MenuItem>
                  <MenuItem value={"Dentistry"}>Dentistry</MenuItem>
                  <MenuItem value={"Design and Environment"}>Design and Environment</MenuItem>
                  <MenuItem value={"Engineering"}>Engineering</MenuItem>
                  <MenuItem value={"Law"}>Law</MenuItem>
                  <MenuItem value={"Medicine"}>Medicine</MenuItem>
                  <MenuItem value={"Music"}>Music</MenuItem>
                  <MenuItem value={"Nursing"}>Nursing</MenuItem>
                </Select>
              </FormControl>
              <p />
              <Button variant="contained" style={{ background: "#1D5FB6", color: "white" }}
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
