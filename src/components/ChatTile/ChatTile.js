import { firebase } from '@firebase/app';
import { Card, CardActionArea, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './ChatTile.module.css';

export default function ChatTile(props) {
    const db = firebase.firestore();
    const dbCollection = db.collection("users");
    const uid = props.uid;
    
    
    const [userName, setUserName] = useState("");
    const [userYear, setUserYear] = useState(0);
    const [userFaculty, setUserFaculty] = useState("")
    const onClickFunction = () => {
        props.clickFunction(uid, userName);
    }

    dbCollection.doc(uid).get().then((doc) => {
        if (doc.exists) {
            setUserName(doc.data().name);
            setUserYear(doc.data().year);
            setUserFaculty(doc.data().faculty);
        }
    }
    )

    return (
        <Card
        className = {styles.chatTile}
        onClick = {onClickFunction}>
            <CardActionArea >
                <Typography gutterBottom variant="h5" component="h2">
                    {userName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {userFaculty}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {"Year "+userYear}
                </Typography>

            </CardActionArea>
            
        </Card>
    )

}