import React, { Component } from 'react';
import Resizer from 'react-image-file-resizer';
import { MessageList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';


import { db } from "../../../Firebase/firestore";
import { auth } from '../../../Firebase/auth';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, messages: [], disabled: false };
    //...
  }
  componentDidMount(){
    auth.onAuthStateChanged(user => {
        // this.setState({user})
        let messages = []
        db.collection("chatRoom1").get().then(querySnapshot => {      
          console.log(querySnapshot.size, querySnapshot.forEach(data => console.log(data.data()))); 
        db.collection('chatRoom1').orderBy('date', 'desc').get()
        .then(res => {
          res.forEach(messg => {
            let authedAndself = auth.currentUser ? messg.data().uid === auth.currentUser.uid ? true : false: false;
            if(messg.data().type === "text"){
              messages.unshift(
                {
                  avatar: messg.data().avatar,
                  type: 'text',
                  position: authedAndself ? 'right' : 'left',
                  text: messg.data().text,
                  title: authedAndself ? 'Me' : messg.data().title,
                  date: new Date(messg.data().date.seconds * 1000),
                  replyButton: authedAndself,
                  onReplyMessageClick: () => alert('reply clicked!')
                }
              )
            }
            else if(messg.data().type === "photo"){
              console.log("photo adding");
              messages.unshift(
                {
                  avatar: messg.data().avatar,
                  type: 'photo',
                  position: authedAndself ? 'right' : 'left',
                  title: authedAndself ? 'Me' : messg.data().title,
                  date: new Date(messg.data().date.seconds * 1000),
                  replyButton: authedAndself,
                  class: 'messg',
                  className: 'messg',
                  onOpen: () => window.open(messg.data().data.uri),
                  // onClick: () => window.open(messg.data().data.uri),
                  data: {
                    uri: messg.data().data.uri,
                  },
                  onReplyMessageClick: () => alert('reply clicked!')
                }
              )
            }
          })
          this.setState({user, messages})
        })
      });
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
            newMsg.unshift({
              avatar: change.doc.data().avatar,
              type: 'text',
              position: authed ? 'right' : 'left',
              text: change.doc.data().text,
              title: authed ? 'Me' : change.doc.data().title,
              date: new Date(change.doc.data().date.seconds * 1000),
              replyButton: authed,
              
            });
          }
          else if (change.doc.data().type === 'photo'){
            newMsg.unshift({
              avatar: change.doc.data().avatar,
              type: 'photo',
              position: authed ? 'right' : 'left',
              title: authed ? 'Me' : change.doc.data().title,

              date: new Date(change.doc.data().date * 1000).toLocaleTimeString(),
              replyButton: authed,
              data: {
                uri: change.doc.data().data.uri,
                status: { click: false }
              },
            });
          }
            // console.log("New Message Added: ", this.state.messages);
          // this.props.setChat({text: newMsg[0].text, time: newMsg[0].time})
          this.setState({ messages: this.state.messages.concat(newMsg) })
        }
      });
    });
  }
  SendNewMessage = () => {
    if(!auth.currentUser) window.location.replace('/sign-in')
    this.setState({disabled: true})
    console.log("sending a message");
    if(document.getElementById('msgInput').value <= 0) return;
    db.collection('chatRoom1').add(
      {
        text: document.getElementById('msgInput').value, 
        uid: this.state.user ? this.state.user.uid: null,
        title: this.state.user ? this.state.user.displayName: null,
        avatar: this.state.user ? this.state.user.photoURL: null,
        type: 'text',
        date: new Date(),
        
      })
      .then(() => {document.getElementById('msgInput').value = '';
      //  this.setState({disabled: false})
      })
  }
  SendNewImage = () => {
    if(!auth.currentUser) window.location.replace('/sign-in')
    let img = document.getElementById('imgInput').files[0];
    if(!img) return;
    if(img.type.split('/')[0] === "image"){
      this.setState({disabled: true})

            Resizer.imageFileResizer(
                img,
                300,
                300,
                'JPEG',
                100,
                0,
                uri => {
                    db.collection('chatRoom1').add({
                      uid: this.state.user ? this.state.user.uid: null,
                      title: this.state.user ? this.state.user.displayName: null,
                      avatar: this.state.user ? this.state.user.photoURL: null,
                      type: 'photo',
                      date: new Date(),
                      data: {
                        uri
                      }
                    })
                    .then(() => this.setState({disabled: false}))
                },
                'base64'
            );
    }
    else{
      alert('Upload type not image');
    }


  }
  render() {
    return (
      <div  >
        <div className='card-title'>Chat Room 1</div>
        <div className='divider'></div>
        <div style={{ minHeight: '64vh', maxHeight: '64vh', overflow: 'scroll', overflowX: 'hidden'}} >
          <MessageList
            className='message-list'
            toBottomHeight={'100%'}
            dataSource={this.state.messages} 
            // downButton={true}
            onDownload={msg => {
              let wind = window.open('_blank');
              wind.document.body.innerHTML = `<img src=${msg.data.uri} alt="" />`
            }}
            onReplyClick={obj => alert(`Replied to ${obj.title}`)}
          />
        </div>

        <div className='divider' ></div>
        <div style={{display: 'flex', paddingTop: 15}} > 
          <input type='text' id="msgInput" placeholder="Message..." autoComplete="off"  disabled={this.state.disabled}
            onKeyDown={event => {if(event.keyCode == 13) this.SendNewMessage()}} style={{ flexGrow: 1, marginRigth: 20, outline: 'none',}}  />
          <input type='file' accept="image/*" className="hide" id="imgInput" onChange={this.SendNewImage} />

        <button 
          className='btn'
          disabled={this.state.disabled} 
          onClick={() => document.getElementById('imgInput').click()}
          style={{  marginLeft: 20,  background: 'black',  borderRadius: '100%',  width: 50,  height: 50,}} >
          <i className="material-icons right">image</i>
        </button>

        <button 
          className='btn'
          disabled={this.state.disabled} 
          onClick={this.SendNewMessage}
          style={{  marginLeft: 20,  background: 'black',  borderRadius: '100%',  width: 50,  height: 50,}} >
        <i className="material-icons right">message</i>
        </button>
        </div>
      </div>
    );
  }
}

export default Dashboard;