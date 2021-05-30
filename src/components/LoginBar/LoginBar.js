
import logo from '../../modfriend.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Paper, TextField } from '@material-ui/core';
import styles from "./LoginBar.module.css";

function LoginBar() {
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
          <Paper elevation = {3}>
          <form className = {styles.loginForm}>
          <TextField id="standard-basic" label="E-mail"/>
          <TextField id="standard-basic" label="Password"/>
            <Button variant = "contained" style = {{background: "#4952ff", color: "white"}}>
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
export default LoginBar;