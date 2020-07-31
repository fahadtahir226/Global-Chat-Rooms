import React, { Component } from 'react';
import { MessageBox } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';


import { db } from "../../../Firebase/firestore";
import { auth } from '../../../Firebase/auth';



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, messages: [] };
    //...
  }
  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if(user) {
        // this.setState({user})
        let messages = []
        db.collection('chatRoom3').orderBy('time').get()
        .then(res => {
          res.forEach(messg => {
            console.log(messg.data())
            if(messg.data().type === "text"){
              messages.push(
                {
                  avatar: messg.data().avatar,
                  type: 'text',
                  position: messg.data().uid === auth.currentUser.uid ? 'right' : 'left',
                  text: messg.data().text,
                  title: messg.data().uid === auth.currentUser.uid ? 'Me' : messg.data().title,
                  time: messg.data().time,
                }
              )
            }
          })
          this.setState({user, messages})
        })
      }
      else this.setState({user: null});
      console.log("state updated");  
    })
  }
  // componentWillMount(){
  //   db.collection("chatRoom1").onSnapshot(snapshot => {
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
  SendNewMessage = () => {
    console.log(this.state.user);
    console.log(`${new Date().getHours()} : ${new Date().getMinutes()} = ${new Date().getTime()}`);
    db.collection('chatRoom3').add(
      {
        text: document.getElementById('msgInput').value, 
        uid: this.state.user ? this.state.user.uid: null,
        title: this.state.user ? this.state.user.displayName: null,
        avatar: this.state.user ? this.state.user.photoURL: null,
        type: 'text',
        time: new Date().getTime()
      })
      .then(() => document.getElementById('msgInput').value = '')
  }
   
  render() {
    return (
      <div  >
        <div className='card-title'>Chat Room 3</div>
        <div className='divider'></div>
        <div style={{ maxHeight: '64vh', overflow: 'scroll', overflowX: 'hidden'}} >
        {
          this.state.messages.map((message, index) => {
            return <MessageBox
            position={message.position}
            type={message.type}
            text={message.text}
            title={message.title}
            avatar={message.avatar}
            avatarFlexible={true}
            // dateString={new Date(message.time.seconds).toLocaleTimeString()}
            />
          })
        }
      </div>

        <div className='divider' ></div>
        <div style={{display: 'flex', paddingTop: 15}} > 
        <input type='text' id="msgInput" placeholder="Message..."
          onKeyDown={event => {if(event.keyCode == 13) this.SendNewMessage()}} style={{ flexGrow: 1, marginRigth: 20, outline: 'none',}}  />
        <button className='btn' onClick={this.SendNewMessage}style={{  marginLeft: 20,  background: 'black',  borderRadius: '100%',  width: 50,  height: 50,}} >

        <i class="material-icons right">message</i>
        </button>
        </div>
      </div>
    );
  }
}

export default Dashboard;