import { auth } from "../../config/firebase";
import { firebase } from "@firebase/app";
import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function ChatRoom(props) {
    const uid1 = auth.currentUser;
    const uidcombined = uid1 + props.otherUid;
    const firestore = firebase.firestore();
    const messagesRef = firestore.collection('messages')/*.doc(uidcombined).collection('messages')*/;
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, {idField: 'id'});
    const [formValue, setFormValue] = useState('');
    

    const sendMessage = async(e) => {
        e.preventDefault();

        const { uid } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid
        })

        setFormValue('');
    }


    return (
        <>
        <div>
            {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg} />)}
        </div>
        <form onSubmit={sendMessage}>
            <input value = {formValue} onChange = {(e) => setFormValue(e.target.value)}/>
            <button type = "submit">
                Send
            </button>
        </form>
        </>
    )
}

function ChatMessage(props) {
    const { text, uid } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    return (
        <div className={`message ${messageClass}`}>
        <p>{text}</p>
        </div>
    )
}