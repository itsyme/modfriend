import { useState } from "react"
import { firebase } from "@firebase/app"
import { Button, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './MyProfile.module.css';

function MyProfile() {
    const [name, setName] = useState("")
    const [faculty, setFaculty] = useState("")
    const [modules, setModules] = useState([])
    const [year, setYear] = useState("")
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(uid);

    docRef.get().then((doc) => {
        if (doc.exists) {
            setName(doc.data().name);
            setFaculty(doc.data().faculty);
            setModules(doc.data().modules);
            setYear(doc.data().year);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });



    return (
        <>
        <center>   
        <div className = {styles.label}>
        <h1 className = {styles.font}>
            Your Profile
        </h1>
        </div>
        </center>
            <Paper elevation = {3} className = {styles.profileData} style = {{background: 'linear-gradient(rgba(74, 83, 107, 0.8), rgba(74, 83, 107, 0.6))',
             color: 'white',
             borderRadius: '70px'}}>
                <div className = {styles.font}>
                
                <h3>
                    Name: {name}
                </h3>
                <h3>
                    Faculty: {faculty}
                </h3>
                <h3>
                    Year: {year}
                </h3>
                <h3>
                    Modules:

                </h3>
                <div> {modules.map(modules => (<p key={modules}> {modules} </p>))} </div>
                </div>
                </Paper>
                <center>
                <Button
                    style={{ background: "#1D5FB6",
                     color: "white",
                    marginTop: '10px' }}
                    variant="contained"
                    component={Link}
                    to='/ProfileEdit'>
                    Edit Profile
                </Button>
                </center>
                <p />
        </>

    )
}

export default MyProfile;