import { auth } from "../../config/firebase";
import { firebase } from "@firebase/app";
import { useState , useRef } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loading from '../Loading/Loading';
import styles from './ChatRoom.module.css';

export default function ChatRoom(props) {
    const dummy = useRef();
    const uid1 = auth.currentUser.uid;
    const uidcombined1 = uid1 + props.otherUid;
    const uidcombined2 = props.otherUid + uid1;
    const firestore = firebase.firestore();
    const [messagesRef, setMessagesRef] = useState(firestore.collection('messages').doc(uidcombined1).collection('messages2'));
    const docRef1 = firestore.collection('messages').doc(uidcombined1);
    const docRef2 = firestore.collection('messages').doc(uidcombined2);
    const [loading, setLoading] = useState(false);

    
    docRef1.get().then((doc) => {
        if (doc.exists) {
            setLoading(false);
            return;
        }

        docRef2.get().then((doc2) => {
            if (doc2.exists) {
                setLoading(false);
                return;
            }

            docRef2.set({
                room: true,
            });
            docRef2.collection("messages2").doc("1").set({
                text: "Chat Room Created!",
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid1
            })
        })
        setMessagesRef(firestore.collection('messages').doc(uidcombined2).collection('messages2'));
        setLoading(false);
        return;
    })
    
    

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

        dummy.current.scrollIntoView({behavior: 'smooth'});
    }


    return (
        loading ? <Loading /> :
        <div>
            <div> 
                {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg} />)}
                <div ref = {dummy}></div>
            </div>
            <form onSubmit={sendMessage}>
                <input className = {styles.textBar} value = {formValue} onChange = {(e) => setFormValue(e.target.value)}/>
                <button className = {styles.sendButton} type = "submit">
                    Send
                </button>
            </form>
        </div>
        
    )
}

function ChatMessage(props) {
    const { text, uid } = props.message;
    const isSender = uid === auth.currentUser.uid;
    return (
        <div className={isSender ? styles.sendMessage : styles.receiveMessage}>
        <p>{text}</p>
        </div>
    )
}