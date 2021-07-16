import logo from '../../modfriend.png';
import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, Paper, TextField } from '@material-ui/core';
import styles from "./LoginBar.module.css";
import { useAuth } from '../../contexts/AuthContext'
import { Alert } from '@material-ui/lab';

export default function LoginBar() {
  const history = useHistory();
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
  e.preventDefault()

    try {
      setError("")
      //setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
    } catch {
      return setError("Failed to log in")
    }

    console.log("successful login")
    history.push("/Home")
    
    //setLoading(false)
    //setError("no error")
    history.push('/MyProfile')
  }

    return (
        <div className = {styles.padding}>
          <center>
          <img src = {logo} alt = "modFriend logo" 
          height = "138" width = "375">
          </img>
        <h1 className = {styles.textStyle}>
          Welcome to modFriend!
        </h1>
        <p>
          <h2 className = {styles.textStyle}>
            Please Login or Sign up to continue
          </h2>
        </p>
        <Box display = 'inline-block'>
        {error && <Alert severity="error">{error}</Alert>}
          <Paper elevation = {3}>
          <form className = {styles.loginForm} 
          onSubmit={handleSubmit}
          action="/Home"
          >
          <TextField
          className = {styles.textField} 
          id="standard-basic" 
          label="E-mail"
          type="email"
          inputRef={emailRef} required
          />
          <TextField 
          className = {styles.textField}
          id="standard-basic" 
          label="Password"
          type="password"
          inputRef={passwordRef} required
          />
            <Button variant = "contained" style = {{background: "#1D5FB6", color: "white"}} 
            type="submit">
              Login
            </Button>
          
          </form>
          </Paper>
        </Box>
        
        <p>
          <Button component = {Link} to="/Register">
           Sign up!
          </Button>
        </p>
        
        </center>
    </div>
    )
}
