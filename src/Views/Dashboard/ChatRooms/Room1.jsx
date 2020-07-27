import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui'
import { db } from "../../../Firebase/firestore";
import { auth } from '../../../Firebase/auth';



class Room1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        // new Message({ id: 1, message: "I'm the recipient! (The person you're talking to)"}), // Gray bubble
        // new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
        // new Message({ id: 3, message: "I'm the recipient! (The person you're talking to)"}), // Gray bubble
        // new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
        // new Message({ id: 5, message: "I'm the recipient! (The person you're talking to)"}), // Gray bubble
        // new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
      ],
      //...
    };
    //...
  }
  componentDidMount(){
        // this.setState({user})
        let messages = []
        db.collection('chatRoom1').orderBy('time').get()
        .then(res => {
          res.forEach(messg => {
            console.log(messg.data())
            if(messg.data().type === 'text'){
              messages.push(new Message({
                id: messg.data().uid === auth.currentUser.uid ? 0 : messg.data().uid,
                message: messg.data().message,
                senderName: messg.data().name,
              }))
            }
            else if(messg.data().type === 'img'){
              
            }
          })
          this.setState({messages})
        })
  
  }
  componentWillMount(){
    db.collection("chatRoom1").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          let newMsg = [ new Message({
            id: change.doc.data().uid === auth.currentUser.uid ? 0 : change.doc.data().uid,
            message: change.doc.data().message,
            senderName: change.doc.data().name,
          }) ];
            // console.log(newMsg);
          this.setState({ messages: this.state.messages.concat(newMsg) })
          // console.log("New Message Added: ", change.doc.data());
        }
      });
    });
  }
  SendNewMessage = () => {
    db.collection('chatRoom1').add(
      {
        type: 'text',
        message: document.getElementById('msgInput').value, 
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        time: new Date().getTime()
      })
      .then(() => document.getElementById('msgInput').value = '')
  }
  UploadImage = () => {
    console.log(`${new Date().getHours()} : ${new Date().getMinutes()} = ${new Date().getTime()}`);
    db.collection('chatRoom1').add(
      {
        message: document.getElementById('msgInput').value, 
        uid: this.state.user ? this.state.user.uid: null,
        name: this.state.user ? this.state.user.displayName: null,
        time: new Date().getTime()
      })
      .then(() => document.getElementById('msgInput').value = '')
  }
   
  render() {
    return (
      <>
        <div className='card-title'>Chat Room 1</div>
        <div className='divider'></div>
          <div className="col s12 m8 l6" style={{maxHeight: 400, overflow: 'scroll', overflowX: 'hidden'}}>
            <ChatFeed
              messages={this.state.messages} // Boolean: list of message objects
              isTyping={false} // Boolean: is the recipient typing
              hasInputField={false} // Boolean: use our input, or use your own
              showSenderName={true} // show the name of the user who sent the message
              // bubblesCentered={true} //Boolean should the bubbles be centered in the feed?
              // // JSON: Custom bubble styles
              // bubbleStyles={
              //   {
              //     text: {
              //       fontSize: 14
              //     },
              //     chatbubble: {
              //       // borderRadius: 70,
              //       minWidth: 100,
              //       padding: 10
              //     },
              //     chat: {
              //       height: 400,
              //     }
              //   }
              // }
            />
          </div>
        <div className='card-action' style={{display: 'flex'}} >
          <input 
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
          <input type="file" onChange={() => this.UploadImage} id='imageUpload' style={{display: 'none'}} />
          <button 
            className='btn' onClick={() => document.getElementById('imageUpload').click()} style={{  marginLeft: 20,  background: 'black',  borderRadius: '100%',  width: 50,  height: 50,}} >
            {/* send */}
            <i class="material-icons right">image</i>
          </button>
          <button  className='btn' onClick={this.SendNewMessage} style={{ marginLeft: 20, background: 'black', borderRadius: '100%', width: 50, height: 50,}}>
              {/* send */}
            <i class="material-icons right">message</i>
          </button>
        </div>
      </>
    );
  }
}

export default Room1;