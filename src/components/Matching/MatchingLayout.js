import React, { useEffect, useState , useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Switch, IconButton, InputLabel, List, ListItem, 
ListItemSecondaryAction, ListItemText, ListItemAvatar, TextField} from "@material-ui/core";
import { firebase } from "@firebase/app";
import { Alert } from '@material-ui/lab';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxListSecondary() {
  const [error, setError] = useState('')
  const classes = useStyles();
  const [userMods, setUserMods] = useState([]);
  const [availMods, setAvailMods] = React.useState([]);
  const moduleRef = useRef()


  const handleToggle = (value) => () => {
    const currentIndex = availMods.indexOf(value);
    const newChecked = [...availMods];
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();

    if (currentIndex === -1) {
      newChecked.push(value);
      db.collection('mods').doc(value).update({
        users: firebase.firestore.FieldValue.arrayUnion(uid)
     });
    } else {
      newChecked.splice(currentIndex, 1);
     db.collection('mods').doc(value).update({
      users: firebase.firestore.FieldValue.arrayRemove(uid)
   });
    }
    setAvailMods(newChecked);
  };


  const fetchModules = async() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const response=db.collection('users').doc(uid);
    response.get().then((doc) => {
        if (doc.exists) {
            setUserMods(doc.data().modules)
            if (doc.data().availableMods.length > 0) {
              setAvailMods(doc.data().availableMods)
            } else {
              setAvailMods(userMods)
            }
            console.log(doc.data().availableMods)
             
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

  async function handleMatch(e) {
    e.preventDefault();
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("users").doc(uid).update({ 
      availableMods: availMods
    })
    const allUsers = db.collection("users");
    const userModules = (await allUsers.doc(uid).get()).data().availableMods;
    const mods = db.collection("mods");
    const userMatches = (await allUsers.doc(uid).get()).data().matches;

    for (let i = 0; i < userModules.length; i++) {
      var thisMod = userModules[i];
      var matchMod = (await mods.doc(thisMod).get()).data().users;
      var copyUsers = []

      for (let j = 0; j < matchMod.length; j++) {
        var thisUser = matchMod[j];

        if (thisUser === uid) continue;

        if (userMatches.includes(thisUser)) continue;

        copyUsers.push(thisUser);
        
      }

      if (copyUsers.length < 1 ) continue;

      //console.log(copyUsers)

     
      var result = copyUsers[Math.floor(Math.random() * copyUsers.length)];



      allUsers.doc(uid).update({
        matches: firebase.firestore.FieldValue.arrayUnion(result),
        //availability: false
      })

      allUsers.doc(result).update({
        matches: firebase.firestore.FieldValue.arrayUnion(uid),
        //availability: false
      })
      
      // if (copyUsers.length === 0) {
      //   setError("no matches found")
      // } 

      //console.log(error)
      alert("Matching Complete!")
    }
     

    //history.push("/Chat")
}

async function handleDelete(value) {
  //value.preventDefault();
  const uid = firebase.auth().currentUser?.uid;
  const db = firebase.firestore();
  db.collection('users').doc(uid).update({
    modules: firebase.firestore.FieldValue.arrayRemove(value),
    availableMods: firebase.firestore.FieldValue.arrayRemove(value)
 });
 db.collection('mods').doc(value).update({
  users: firebase.firestore.FieldValue.arrayRemove(uid)
});
 console.log('deleted', value)
  const newModules = (await db.collection('users').doc(uid).get()).data().modules;
  setUserMods(newModules)
}

async function handleAddMod(e) {
  <TextField 
      required id="standard-required" 
      label="add Module"
      type="text"
      inputRef={moduleRef} required
      /> 
      console.log("add")

}
//console.log(availMods)

  return (
    <div>
    <List dense className={classes.root}>
    {error && <Alert severity="error">{error}</Alert>}
      {userMods.map((value) => {
        const labelId = {value};
        return (
          <h2>
          <ListItem key={value}>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={`${value}`} />
            <ListItemSecondaryAction>
            <InputLabel>Availability</InputLabel>
            <Switch
            edge="end"
            onChange={handleToggle(value)}
            checked={availMods.indexOf(value) !== -1}
            inputProps={{ 'aria-labelledby':  labelId }}
          />
            </ListItemSecondaryAction>
          </ListItem>
          <IconButton onClick={() => handleDelete(value)}>
              <DeleteOutlined />
            </IconButton>
          </h2>
        );
      })}
      <Fab color="primary" aria-label="add" size="small" onClick={() => handleAddMod}>
        <AddIcon />
      </Fab>
    </List>
    <Button onClick={handleMatch} variant = "contained" style = {{background: "#4952ff", color: "white"}}>
        Match!
      </Button>
      </div>
  );
}


