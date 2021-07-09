import React, { useState } from 'react';
import { firebase } from "@firebase/app";
import ChatTile from "../ChatTile/ChatTile";
import ChatRoom from "../ChatRoom/ChatRoom";

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
        {matches.length > 0 ? matches : <h3>No matches found</h3>}
        {chatUid === "" ? <h3>Click on a match!</h3> : <ChatRoom otherUid = {chatUid} />}
      </>
    )
}

export default Chat;

/*import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Attachment,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGFyay1kZXctNiIsImV4cCI6MTYyNDI4MzIzNH0.p3I3QlCRKzFN1Jogk15klVb33-D_lbWv7yjiwNPJXH0';

const filters = { type: 'messaging', members: { $in: ['dark-dew-6'] } };
const sort = { last_message_at: -1 };

const attachments = [
  {
    image: 'https://images-na.ssl-images-amazon.com/images/I/71k0cry-ceL._SL1500_.jpg',
    name: 'iPhone',
    type: 'product',
    url: 'https://goo.gl/ppFmcR',
  },
];

const CustomAttachment = (props) => {
  const { attachments } = props;
  const [attachment] = attachments || [];

  if (attachment?.type === 'product') {
    return (
      <div>
        Product:
        <a href={attachment.url} rel='noreferrer'>
          <img alt='custom-attachment' height='100px' src={attachment.image} />
          <br />
          {attachment.name}
        </a>
      </div>
    );
  }

  return <Attachment {...props} />;
};

const App = () => {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance('dz5f4d5kzrue');

      await client.connectUser(
        {
          id: 'dark-dew-6',
          name: 'dark',
          image: 'https://getstream.io/random_png/?id=dark-dew-6&name=dark',
        },
        userToken,
      );

      const [channelResponse] = await client.queryChannels(filters, sort);

      await channelResponse.sendMessage({
        text: 'Your selected product is out of stock, would you like to select one of these alternatives?',
        attachments,
      });

      setChatClient(client);
    };

    initChat();
  }, []);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme='messaging light'>
      <ChannelList filters={filters} sort={sort} />
      <Channel Attachment={CustomAttachment}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;
*/