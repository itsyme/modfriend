import logo from '../../modfriend.png';
import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, Paper, TextField } from '@material-ui/core';
import styles from "./RegisterForm.module.css";
import { useAuth, AuthProvider } from '../../contexts/AuthContext';

//import { firebase } from '@firebase/app';
import firebase from 'firebase';
import { auth } from '../../config/firebase';


function RegisterForm() {
  const emailRef = useRef(null);
const passwordRef = useRef(null);

  const signUp = e => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(
    emailRef.current.value, passwordRef.current.value
    ).then(user => {
    console.log(user)
    }).catch(err => {
    console.log(err)
    })
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
            <form className={styles.registerForm}>
              <TextField
                required id="standard-required"
                label = "email"
                input ref={emailRef} type="email"
                />
              <p />
              <TextField required id="standard-required" label = "password" input ref={passwordRef} type="password" 
                />
              <p />
              <TextField required id="standard-required" label="Re-enter Password"/>
              <p />
              <Button variant="contained" style={{ background: "#4952ff", color: "white" }}
                onSubmit={signUp}
                component={Link} to='/ProfileCreation'>
                Submit
              </Button>

            </form>
          </Paper>
        </Box>
      </center>
    </div>
  );
}



export default RegisterForm;