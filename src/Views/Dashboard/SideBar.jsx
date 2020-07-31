import React from 'react';
import { ChatItem } from 'react-chat-elements'
import { Link } from 'react-router-dom' 
import one from '../../Images/one.png'
import two from '../../Images/two.png'
import three from '../../Images/three.png'

const SizeBar = () => {

  return (
    <>
      <div  style={{height: '89vh',paddingLeft : 0, border: '2px solid #f5f5f5'}} >
        <Link to="chatRoom1">
          <ChatItem 
            avatar={one} 
            title={'Chat Room 1'} subtitle={'What are you doing?'} 
            date={new Date()} 
            unread={4}
          />
        </Link>
        <Link to="chatRoom2">
          <ChatItem avatar={two} alt={'Reactjs'} title={'Chat Room 2'} subtitle={'What are you doing?'} date={new Date()} unread={0}  />
        </Link>
        <Link to="chatRoom3">
          <ChatItem avatar={three} alt={'Reactjs'} title={'Chat Room 3'} subtitle={'What are you doing?'} date={new Date()} unread={0}  />
        </Link>
      </div>
     </>
  );
};

export default SizeBar;