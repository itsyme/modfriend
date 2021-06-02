import logo from '../../modfriend.png';
import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, Paper, TextField } from '@material-ui/core';
import styles from "./RegisterForm.module.css";
import { useAuth, AuthProvider } from '../../contexts/AuthContext';

//import { createUserWithEmailAndPassword } from 'firebase/auth';

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const signup = useAuth();

  const handleRegistration = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signup(email, password)
      .then((ref) => {
        setLoading(false);
        history.push('/');
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

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
                label="Email"
                />
              <p />
              <TextField required id="standard-required" label="Password" inputRef={emailRef}
                />
              <p />
              <TextField required id="standard-required" label="Re-enter Password" inputRef={passwordRef}/>
              <p />
              <Button variant="contained" style={{ background: "#4952ff", color: "white" }}
                onSubmit={(e) => handleRegistration(e)}
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