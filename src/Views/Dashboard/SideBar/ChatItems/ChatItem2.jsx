import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom' 
import { ChatItem } from 'react-chat-elements'
// import { db } from "../../../../Firebase/firestore";
import two from '../../../../Images/two.png'


const ChatItem2 = props => {
  // const [ChatRoom2, setChatRoom2] = useState({});
  // useEffect(() => {
  //   db.collection("chatRoom2").onSnapshot(snapshot => {
  //     snapshot.docChanges().forEach(change => {
  //       if (change.type === "added") {
  //         // console.log("New Message Added: ", newMsg);
  //         setChatRoom2({text: change.doc.data().text, time: new Date(change.doc.data().time.seconds * 1000).toLocaleTimeString()})
  //       }
  //     });
  //   });
  // })
  return (
    <div>
      <Link to="chatRoom2">
        <ChatItem 
          avatar={two} 
          alt={'Reactjs'} 
          title={'Chat Room 2'} 
          subtitle={props.text} 
          date={props.time} />
      </Link>
    </div>
  );
};

export default ChatItem2;