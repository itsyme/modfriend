import { firebase } from '@firebase/app';
import { Card, CardActionArea, Typography } from '@material-ui/core';

export default function ChatTile(props) {
    const db = firebase.firestore();
    const dbCollection = db.collection("users");
    const uid = props.uid;
    const user = await dbCollection.doc(uid).get();
    const userName = user.data().name;
    const userYear = user.data().year;
    const userFaculty = user.data().faculty;

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