import React, { useState } from 'react';
import { firebase } from "@firebase/app";
import ChatTile from "../ChatTile/ChatTile";

function Chat() {
  const [friend, setFriend] = useState([])
  const [friendName, setFriendName] = useState("ur new friend")
  const [name, setName] = useState("")
  const uid = firebase.auth().currentUser?.uid;
  const db = firebase.firestore();
  const users = db.collection('users')
  var matches = [];

  users.doc(uid).get().then((doc) => {
    if (doc.exists) {
      setFriend(doc.data().matches)
      setFriendName(friend[0])      
    }
    else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});

users.doc(friendName).get().then((doc) => {
  if (doc.exists) {
    setName(doc.data().name)
  } else {
    console.log("no Document")
  } 
})

for (let i = 0; i < friend.length; i++) {
  matches.push(<ChatTile uid={friend[i]} key = {i} />)
}

//console.log(friendName)


    return (
      <>
        <h1>
            Start chatting with {name} !
        </h1>
        {matches}
      </>
    )
}

export default Chat;
