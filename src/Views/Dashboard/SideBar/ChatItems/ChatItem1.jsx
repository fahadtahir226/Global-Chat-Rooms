import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom' 
import { ChatItem } from 'react-chat-elements'
import { db } from "../../../../Firebase/firestore";
import one from '../../../../Images/one.png'


const ChatItem1 = props => {
  // const [ChatRoom1, setChatRoom1] = useState({});
  // useEffect(() => {
  //   db.collection("chatRoom1").onSnapshot(snapshot => {
  //     snapshot.docChanges().forEach(change => {
  //       if (change.type === "added") {
  //         // console.log("New Message Added: ", newMsg);
  //         setChatRoom1({text: change.doc.data().text, time: new Date(change.doc.data().time.seconds * 1000).toLocaleTimeString()})
  //       }
  //     });
  //   });
  // })
  return (
    <div>
      <Link to="chatRoom1">
        <ChatItem 
          avatar={one} 
          title={'Chat Room 1'} 
          subtitle={props.text} 
          date={props.time}
          // unread={4}
        />
        </Link>
    </div>
  );
};

export default ChatItem1;