import React, { useState } from 'react';
import { firebase } from "@firebase/app";
import ChatTile from "../ChatTile/ChatTile";
import ChatRoom from "../ChatRoom/ChatRoom";
import styles from "./Chat.module.css";

function Chat() {
  const [friend, setFriend] = useState([]);
  const [name, setName] = useState("");
  const [chatUid, setChatUid] = useState("");
  const uid = firebase.auth().currentUser?.uid;
  const db = firebase.firestore();
  const users = db.collection('users');
  var matches = [];
  const childFunction = (data, name) => {
    setChatUid(data);
    setName(name);
  }

  users.doc(uid).get().then((doc) => {
    if (doc.exists) {
      setFriend(doc.data().matches) 
    }
    else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});

/*users.doc(friendName).get().then((doc) => {
  if (doc.exists) {
    setName(doc.data().name)
  } else {
    console.log("no Document")
  } 
})*/

for (let i = 0; i < friend.length; i++) {
  matches.push(<ChatTile uid={friend[i]} key = {i} clickFunction = {childFunction}/>)
}

//console.log(friendName)



    return (
      <>
      
        <h1>
            Chatting with {name}!
        </h1>
        <div className = {styles.row}>
          <div>
            {matches.length > 0 ? matches : <h3>No matches found</h3>}
          </div>
          <div  className = {styles.chatRoom}>
            {chatUid === "" ? <h3>Click on a match!</h3> : <ChatRoom otherUid = {chatUid} />}
          </div>
        </div>
      </>
    )
}

export default Chat;
