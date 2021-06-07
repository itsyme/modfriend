import logo from '../../modfriend.png';
import React, { useContext, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, Paper, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import styles from "./RegisterForm.module.css";
import { useAuth } from '../../contexts/AuthContext'
//import { AuthProvider } from '../../contexts/AuthProvider';

//import { firebase } from '@firebase/app';
import firebase from 'firebase';
import { auth } from '../../config/firebase';


export default function RegisterForm() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    //e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    } 

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError("Email already in use or Password shorter than 6 characters")
    } 

    setLoading(false)
    
  }

  return (
    <div>
      <Box className={styles.backButton}>
        <Button component={Link} to='/'>
          Back to Login
                  </Button>
      </Box>
      <center>
        <img src={logo} alt="modFriend logo"
          height="200" width="200">
        </img>
        <h1>
          Sign up here!
          </h1>
        <Box display="inline-block">
          <Paper elevation={3}>
            <form className={styles.registerForm} onSubmit={handleSubmit} action="/ProfileCreation">
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                required id="standard-required"
                label="Email"
                type="email"
                inputRef={emailRef} required
              />
              <p />
              <TextField required id="standard-required"
                label="Password"
                type="password"
                inputRef={passwordRef} required
              />
              <p />
              <TextField required id="standard-required"
                label="Re-enter Password"
                type="password"
                inputRef={passwordConfirmRef} required
              />
              <p />
              <Button variant="contained" style={{ background: "#4952ff", color: "white" }}
                type="submit"
                disabled={loading}
              //component={Link} to='/ProfileCreation'
              >
                Submit
              </Button>

            </form>
          </Paper>
        </Box>
      </center>
    </div>
  );
}
