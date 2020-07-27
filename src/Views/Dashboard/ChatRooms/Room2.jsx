import React, { Component } from 'react';
import { MessageList, MessageBox } from 'react-chat-elements'


import { db } from "../../../Firebase/firestore";
import { auth } from '../../../Firebase/auth';



class Room1 extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, messages: [] };
  }
  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if(user) {
        // this.setState({user})
        let messages = []
        db.collection('chatRoom2').orderBy('time').get()
        .then(res => {
          res.forEach(messg => {
            console.log(messg.data(), auth.currentUser);
            messages.push({
              position: messg.data().uid === auth.currentUser.uid ? 'left' : 'right',
              type: messg.data().type,
              text: messg.data().message,
              date: new Date(messg.data().time),
              // data: {
              //   uri: '',
              //   status: {
              //       click: false,
              //       loading: 0,
              //   }
              // }
            })
          })
          this.setState({user, messages})
        })
      }
      else this.setState({user: null});
      console.log("state updated");  
    })
  }
  // componentWillMount(){
  //   db.collection("chatRoom2").onSnapshot(snapshot => {
  //     snapshot.docChanges().forEach(change => {
  //       if (change.type === "added") {
  //         // let newMsg = change.doc.data();
  //         // newMsg.id = newMsg.uid === auth.currentUser.uid ? 0 : newMsg.uid;
  //         let newMsg = [ new Message({
  //           id: change.doc.data().uid === auth.currentUser.uid ? 0 : change.doc.data().uid,
  //           message: change.doc.data().message,
  //           senderName: change.doc.data().name,
  //         }) ];
  //           // console.log(newMsg);
  //         this.setState({ messages: this.state.messages.concat(newMsg) })
  //         // console.log("New Message Added: ", change.doc.data());
  //       }
  //       // else{
  //       //   this.state.messages.reverse();
  //       // }
  //     });
  //   });
  // }
  // SendNewMessage = () => {
  //   console.log(`${new Date().getHours()} : ${new Date().getMinutes()} = ${new Date().getTime()}`);
  //   db.collection('chatRoom2').add(
  //     {
  //       message: document.getElementById('msgInput').value, 
  //       uid: this.state.user ? this.state.user.uid: null,
  //       name: this.state.user ? this.state.user.displayName: null,
  //       time: new Date().getTime()
  //     })
  //     .then(() => document.getElementById('msgInput').value = '')
  // }
   
  render() {
    return (
      <>
        <div className='card-title'>Chat Room 2</div>
        <div className='divider'></div>
        {
        this.state.user ? 
          <div className="col s12 m8 l6" style={{maxHeight: 400, overflow: 'scroll', overflowX: 'hidden'}}>
            {/* {this.state.messages.map(msg => 
              <MessageBox
                position={msg.position}
                type={msg.type}
                text={msg.text}
                // data={{
                //     uri: msg.data.uri,
                //     status: {
                //         click: msg.data.status.click,
                //         loading: msg.data.status.loading,
                //     }
                // }}
              />
            )} */}
            <MessageList
              className='message-list'
              lockable={true}
              toBottomHeight={'100%'}
              dataSource={this.state.messages
                  // {
                  //     position: 'right',
                  //     type: 'text',
                  //     text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                  //     date: new Date(),
                  // },
              } />
          </div>
        : null
        }
        <div className='card-action' style={{display: 'flex'}} >
          {/* <input 
            type='text' 
            id="msgInput"
            placeholder="Message..."
            onKeyDown={event => {if(event.keyCode == 13) this.SendNewMessage()}}  
            style={{
              flexGrow: 1,
              marginRigth: 20,
              outline: 'none',
            }} 
          />
          <button 
            className='btn'
            onClick={this.SendNewMessage}
              style={{
                marginLeft: 20,
                background: 'black',
                borderRadius: '100%',
                width: 50,
                height: 50,
              }}
            >
            <i class="material-icons right">message</i>
          </button> */}
        </div>
      </>
    );
  }
}

export default Room1;