import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, FormControlLabel, Switch, Typography } from "@material-ui/core";
import { firebase } from "@firebase/app";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [userMods, setUserMods] = useState([]);

  const [state, setState] = React.useState({
    //checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("users").doc(uid).update({ 
      availability: !state.checkedB
    })
    console.log(!state.checkedB)
  };
  

  const fetchModules = async() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const response=db.collection('users').doc(uid);
    response.get().then((doc) => {
        if (doc.exists) {
            setUserMods(doc.data().modules)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!", uid);
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }
  useEffect(() => {
    fetchModules();
  }, [])


  console.log(userMods)


  return (
    <div className={classes.root}>
        <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        spacing={2}
        >
            {userMods.map(function(mod, index){
                    return <Grid key={ index }>
                        <Paper className={classes.paper}>
                        <Typography variant="h5" component="h5">
                            {mod}
                            </Typography>
                            <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Toggle Availability"
      />
                    </Paper>        
               </Grid>
                  })}
        </Grid>
    </div>
  )}
