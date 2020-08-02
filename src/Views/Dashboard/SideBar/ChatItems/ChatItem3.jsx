import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom' 
import { ChatItem } from 'react-chat-elements'
import { db } from "../../../../Firebase/firestore";
import three from '../../../../Images/three.png'


const ChatItem3 = props => {
  // const [ChatRoom3, setChatRoom3] = useState({});
  // useEffect(() => {
  //   db.collection("chatRoom3").onSnapshot(snapshot => {
  //     snapshot.docChanges().forEach(change => {
  //       if (change.type === "added") {
  //         // console.log("New Message Added: ", newMsg);
  //         setChatRoom3({text: change.doc.data().text, time: new Date(change.doc.data().time.seconds * 1000).toLocaleTimeString()})
  //       }
  //     });
  //   });
  // })
  return (
    <div>
      <Link to="chatRoom3">
        <ChatItem 
          avatar={three} 
          alt={'Reactjs'} 
          title={'Chat Room 3'} 
          subtitle={props.text} 
          date={props.time} />
      </Link>
    </div>
  );
};

export default ChatItem3;