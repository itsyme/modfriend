import { useEffect, useState } from "react"
import { firebase } from "@firebase/app"
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
                <h1>
                    Your Profile
                </h1>
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
                <h3>
                    Status:
                </h3>
                <Button
                    style={{ background: "#1D5FB6", color: "white" }}
                    variant="contained"
                    component={Link}
                    to='/ProfileEdit'>
                    Edit Profile
                </Button>
                <p />
                {/* <Button 
        style = {{background: "#1D5FB6", color: "white"}}
        variant = "contained"
        component = {Link} 
        to = '/ModSelect'>
            Edit Mods
        </Button> */}
            </center>
        </>

    )
}

export default MyProfile;