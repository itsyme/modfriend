import logo from '../../modfriend.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Paper, TextField } from '@material-ui/core';
import styles from "./RegisterForm.module.css";

function RegisterForm() {
    return (
        <div>
          <center>
          <img src = {logo} alt = "modFriend logo" 
          height = "200" width = "200">
          </img>
        <h1>
          Sign up here!
        </h1>
        <Box display = "inline-block">
          <Paper elevation = {3}>
          <form className = {styles.registerForm}>
          <TextField required id="standard-required" label="E-mail"/>
          <p />
          <TextField required id="standard-required" label="Password"/>
          <p />
          <TextField required id="standard-required" label="Re-enter Password"/>
          <p />
            <Button variant = "contained" style = {{background: "#4952ff", color: "white"}}>
              Next
            </Button>
          
          </form>
          </Paper>
          </Box>
        </center>
        </div>

    )
}

export default RegisterForm;