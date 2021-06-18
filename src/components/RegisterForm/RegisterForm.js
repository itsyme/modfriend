import logo from '../../modfriend.png';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Paper, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import styles from "./RegisterForm.module.css";
import { useAuth } from '../../contexts/AuthContext'
import {useHistory} from 'react-router-dom';


export default function RegisterForm() {
  const history = useHistory();
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      
      return setError("Passwords do not match");
    } 

    if (passwordRef.current.value.length < 6) {
      
      return setError("Password shorter than 6 characters");
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      return setError("Email already in use");
    } 

    setLoading(false)
    history.push("/ProfileCreation")
    
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
            <form className={styles.registerForm} 
            onSubmit={handleSubmit} 
            >
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                id="email-required"
                label="Email"
                type="email"
                inputRef={emailRef} required
              />
              <p />
              <TextField 
                id="password-required"
                label="Password"
                type="password"
                inputRef={passwordRef} required
              />
              <p />
              <TextField 
                id="repassword-required"
                label="Re-enter Password"
                type="password"
                inputRef={passwordConfirmRef} required
              />
              <p />
              <Button variant="contained" style={{ background: "#4952ff", color: "white" }}
                type="submit"
                disabled={loading}
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
