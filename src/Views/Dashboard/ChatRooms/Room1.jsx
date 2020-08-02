import React, { Component } from 'react';
import { MessageList, MessageBox } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';



import one from '../../../Images/one.png'
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
        // this.setState({user})
        let messages = []
        db.collection('chatRoom1').orderBy('time').get()
        .then(res => {
          res.forEach(messg => {
            let authedAndself = auth.currentUser ? messg.data().uid === auth.currentUser.uid ? true : false: false;
            if(messg.data().type === "text"){
              messages.push(
                {
                  avatar: messg.data().avatar,
                  type: 'text',
                  position: authedAndself ? 'right' : 'left',
                  text: messg.data().text,
                  title: authedAndself ? 'Me' : messg.data().title,
                  time: messg.data().time,
                  replyButton: authedAndself,
                  onReplyMessageClick: () => alert('reply clicked!')
                }
              )
            }
            else if(messg.data().type === "photo"){
              console.log("photo adding");
              messages.push(
                {
                  avatar: messg.data().avatar,
                  type: 'photo',
                  position: authedAndself ? 'right' : 'left',
                  // text: messg.data().text,
                  title: authedAndself ? 'Me' : messg.data().title,
                  time: messg.data().time,
                  replyButton: authedAndself,
                  onOpen: () => window.open(messg.data().data.uri),
                  // onClick: () => window.open(messg.data().data.uri),
                  data: {
                    uri: messg.data().data.uri,
                    status: {
                      click: false,
                      loading: 0,
                    }
                  },
                  onReplyMessageClick: () => alert('reply clicked!')
                }
              )
            }
          })
          this.setState({user, messages})
        })

    })
  }
  componentWillMount(){
    this.database = db.collection("chatRoom1").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          // let newMsg = change.doc.data();
          let newMsg = []
          let authed = auth.currentUser ? change.doc.data().uid === auth.currentUser.uid ? true : false: false;
          if(change.doc.data().type === 'text'){
            newMsg.push({
              avatar: change.doc.data().avatar,
              type: 'text',
              position: authed ? 'right' : 'left',
              text: change.doc.data().text,
              title: authed ? 'Me' : change.doc.data().title,
              time: new Date(change.doc.data().time * 1000).toLocaleTimeString(),
              replyButton: authed,
              onReplyMessageClick: () => alert('reply clicked!')
              
            });
          }
          else if (change.doc.data().type === 'photo'){
            newMsg.push({
              avatar: change.doc.data().avatar,
              type: 'photo',
              position: authed ? 'right' : 'left',
              title: authed ? 'Me' : change.doc.data().title,
              time: new Date(change.doc.data().time * 1000).toLocaleTimeString(),
              // onClick: window.open(change.doc.data().data.uri),
              replyButton: true,
              data: {
                uri: change.doc.data().data.uri,
                status: {
                  click: false,
                  // loading: 1,
                }
              },
              onReplyMessageClick: () => alert('reply clicked!')
            });
          }
            // console.log("New Message Added: ", newMsg);
          // this.props.setChat({text: newMsg[0].text, time: newMsg[0].time})
          this.setState({ messages: this.state.messages.concat(newMsg) })
        }
      });
    });
  }
  SendNewMessage = () => {

    // console.log(`${new Date().getHours()} : ${new Date().getMinutes()} = ${new Date().getTime()}`);
    if(!auth.currentUser) window.location.replace('/sign-in')
    if(document.getElementById('msgInput').value <= 0) return;
    db.collection('chatRoom1').add(
      {
        text: document.getElementById('msgInput').value, 
        uid: this.state.user ? this.state.user.uid: null,
        title: this.state.user ? this.state.user.displayName: null,
        avatar: this.state.user ? this.state.user.photoURL: null,
        type: 'text',
        time: new Date()
      })
      .then(() => document.getElementById('msgInput').value = '')
  }
  render() {
    console.log("State: ", this.state.messages);
    return (
      <div  >
        <div className='card-title'>Chat Room 1</div>
        <div className='divider'></div>
        <div style={{ minHeight: '64vh', maxHeight: '64vh', overflow: 'scroll', overflowX: 'hidden'}} >
          <MessageList
            className='message-list'
            toBottomHeight={'100%'}
            dataSource={this.state.messages} 
            downButton={true}
            onDownload	={msg => window.open(msg.data.uri)}
            onReplyClick	={obj => alert(`Reply Clicked on message ${obj.title}`)}
          />
        </div>

        <div className='divider' ></div>
        <div style={{display: 'flex', paddingTop: 15}} > 
        <input type='text' id="msgInput" placeholder="Message..." autoComplete="off"
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