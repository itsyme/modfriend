import { firebase } from '@firebase/app';
import { Card, CardActionArea, Typography } from '@material-ui/core';
import React, { useState } from 'react';

export default function ChatTile(props) {
    const db = firebase.firestore();
    const dbCollection = db.collection("users");
    const uid = props.uid;
    
    const [userName, setUserName] = useState("");
    const [userYear, setUserYear] = useState(0);
    const [userFaculty, setUserFaculty] = useState("")

    dbCollection.doc(uid).get().then((doc) => {
        if (doc.exists) {
            setUserName(doc.data().name);
            setUserYear(doc.data().year);
            setUserFaculty(doc.data().faculty);
        }
    }
    )

    return (
        <Card>
            <CardActionArea>
                <Typography gutterBottom variant="h5" component="h2">
                    {userName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {userFaculty}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {userYear}
                </Typography>

            </CardActionArea>
        </Card>
    )

}