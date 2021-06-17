import { useEffect, useState } from "react"
import { firebase } from "@firebase/app"

function MyProfile() {
    const [name, setName] = useState("")
    const [faculty, setFaculty] = useState("")
    const [modules, setModules] = useState("")
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(uid);

    docRef.get().then((doc) => {
        if (doc.exists) {
            setName(doc.data().name);
            setFaculty(doc.data().faculty);
            setModules(doc.data().modules)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    return (
        <>
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
            Year:
        </h3>
        <h3>
            Modules: {modules}
        </h3>
        <h3>
            Status:
        </h3>
        </>

    )
}

export default MyProfile;