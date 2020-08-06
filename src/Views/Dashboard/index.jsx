import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// import { ChatFeed, Message } from 'react-chat-ui'
// import { db } from "../../Firebase/firestore";
import { auth } from '../../Firebase/auth';
import TopBar from './TopBar';
import SideBar from './SideBar/SideBar'
import Room1 from './ChatRooms/Room1';
import Room2 from './ChatRooms/Room2';
import Room3 from './ChatRooms/Room3';
// import Room3 from './ChatRooms/Room3';



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      chat1: {text: '', time: ''},
      chat2: {text: '', time: ''},
      chat3: {text: '', time: ''},
    };
    //...
  }
  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if(user) this.setState({user})
      else this.setState({user: null});
      console.log("state updated");  
    })
  }

  render() {
    // let date = new Date();
    // console.log(date.getTime(), new Date((date.getTime())).toLocaleDateString());
    return (
      <div style={{background: "#fafafa"}} >
        <TopBar />
        <div className="container-fluid">
        <div className='row' style={{marginBottom: 0}} >


        {/* <div className="col hide-on-med-and-down m4 l3" style={{padding: 0}}>
          <SideBar 
            chat1={this.state.chat1} 
            chat2={this.state.chat2} 
            chat3={this.state.chat3} />
        </div > */}
        <div className="col s12 m12 l12">
          <div className="card z-depth-0" style={{padding: 20, marginTop: 20, border: '2px solid #f5f5f5', background: 'white'}} >
            {/* {this.state.user ? */}
              <>
                <Route exact path="/dashboard/chatRoom1" ><Room1 /></Route>
                <Route exact path="/dashboard/chatRoom2" ><Room2 /></Route>
                <Route exact path="/dashboard/chatRoom3" ><Room3 /></Route>
              </>
              {/* :  */}
              {/* null */}
            {/* } */}
            {/* <div className='card-title'>Chat Room 1</div>
            <div className='divider'></div>
            {
              this.state.user ? 
              <div className="col s12 m8 l6" style={{maxHeight: 400, overflow: 'scroll', overflowX: 'hidden'}}>
              <ChatFeed
              messages={this.state.messages} // Boolean: list of message objects
              isTyping={false} // Boolean: is the recipient typing
              hasInputField={false} // Boolean: use our input, or use your own
              showSenderName={true} // show the name of the user who sent the message
              bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
              // JSON: Custom bubble styles
              bubbleStyles={
                {
                  text: {
                    fontSize: 14
                  },
                  chatbubble: {
                    // borderRadius: 70,
                    padding: 10
                  },
                  chat: {
                    height: 400,
                  }
                }
              }
              />
              </div>
              : null
            }
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
            send
            <i class="material-icons right">message</i>
            </button>
          </div> */}
        </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Dashboard;