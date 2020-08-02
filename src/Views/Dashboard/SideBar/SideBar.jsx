import React, { useState, useEffect } from 'react';
import { ChatItem } from 'react-chat-elements'
import { Link } from 'react-router-dom' 
import one from '../../../Images/one.png'
import two from '../../../Images/two.png'
import three from '../../../Images/three.png'

// import { db } from "../../Firebase/firestore";


class SizeBar extends React.Component {
  constructor(props) {
    super(props);
    
    console.log(props);
  }
  
  static getSnapshotBeforeUpdate(prevProps,prevState){
    console.log(prevProps, prevState);
  }
  render(){
    return (
      <>
        <div  style={{height: '89vh',paddingLeft : 0, border: '2px solid #f5f5f5'}} >
          <Link to="chatRoom1">
            <ChatItem 
              avatar={one} 
              title={'Chat Room 1'} 
              subtitle={this.props.chat3.text} 
              date={this.props.chat3.time}
            />
          </Link>
          <Link to="chatRoom2">
            <ChatItem avatar={two} alt={'Reactjs'} title={'Chat Room 2'} subtitle={this.props.chat2.text} date={this.props.chat2.time} />
          </Link>
          <Link to="chatRoom3">
            <ChatItem avatar={three} alt={'Reactjs'} title={'Chat Room 3'} subtitle={this.props.chat3.text} date={this.props.chat3.time}  />
          </Link>
        </div>
       </>
    );
  }
};

export default SizeBar;