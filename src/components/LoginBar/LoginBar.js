
import logo from '../../modfriend.png';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Paper, TextField } from '@material-ui/core';
import styles from "./LoginBar.module.css";
import { useAuth } from '../../contexts/AuthContext'
import { Alert } from '@material-ui/lab';
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  //const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
  e.preventDefault()

    try {
      setError("")
      //setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
    } catch {
      //e.preventDefault();
      return setError("Failed to log in")
    }

    console.log("successful login")
    history.push("/Home")
    
    //setLoading(false)
    //setError("no error")
  }

    return (
        <div>
          <center>
          <img src = {logo} alt = "modFriend logo" 
          height = "200" width = "200">
          </img>
        <h1>
          Welcome to modFriend!
        </h1>
        <p>
          <h2>
            Please login or sign up to continue
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
          id="standard-basic" 
          label="E-mail"
          type="email"
          inputRef={emailRef} required
          />
          <TextField 
          id="standard-basic" 
          label="Password"
          type="password"
          inputRef={passwordRef} required
          />
            <Button variant = "contained" style = {{background: "#4952ff", color: "white"}} 
            type="submit">
              Login
            </Button>
          
          </form>
          </Paper>
        </Box>
        <p className = {styles.NUSLogin}>
        Log in with NUS:
        <Button variant = 'contained' style = {{background: "#4952ff", color: "white"}}>
            Click here!
        </Button>
        </p>
        <p>
          <Button component = {Link} to="/Register">
           Sign up!
          </Button>
        </p>
        
        </center>
    </div>
    )
}
