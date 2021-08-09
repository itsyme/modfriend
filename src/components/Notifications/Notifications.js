import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { firebase } from "@firebase/app";
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import styles from './Notifications.module.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AlarmOnOutlinedIcon from '@material-ui/icons/AlarmOnOutlined';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard() {
    const classes = useStyles();
    const [newFriendID, setNewFriendID] = useState([])
    const [error, setError] = useState('')

    const fetchNotifications = async () => {
        const uid = firebase.auth().currentUser?.uid;
        const db = firebase.firestore();
        const response = db.collection('users').doc(uid);
        response.get().then((doc) => {
            if (doc.exists) {
                setNewFriendID(doc.data().newFriend)
                console.log(newFriendID)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!", uid);
            }
        }).catch((error) => {
            setError(error);
            console.log("Error getting document:", error);
        });
    }
    useEffect(() => {
        fetchNotifications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function handleDelete() {

        //value.preventDefault();
        const uid = firebase.auth().currentUser?.uid;
        const db = firebase.firestore();
        db.collection('users').doc(uid).update({
            newFriend: firebase.firestore.FieldValue.delete(),
        });
        const newFriend = (await db.collection('users').doc(uid).get()).data().newFriend;
        setNewFriendID(newFriend)
        console.log("deleted", newFriendID)
    }

    function generate(element) {
        if (Array.isArray(newFriendID) && newFriendID.length) {
            return (newFriendID.map((value) =>
                React.cloneElement(element, {
                    key: value,
                }),
            ))
        } else {
            return (
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            No New Notifications
                        </Typography>
                    </CardContent>
                </Card>
            )
        }
    }

    return (
        <div className={styles.modules}>
            <Card dense className={classes.root}>
                {generate(
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                < AlarmOnOutlinedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary='You have a new friend!'
                        />
                        <IconButton onClick={handleDelete}>
                            <DeleteOutlined />
                        </IconButton>
                    </ListItem>
                )}
            </Card>
        </div>
    );
}