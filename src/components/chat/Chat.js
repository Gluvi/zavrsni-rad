import React from 'react';
import UserLogin from '../user/UserLogin';
import Messages from "./Messages";
import SendMessage from "./SendMessage";

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class Chat extends React.Component {
  state = {
    messages: [],
    member: {
      username: '',
      color: '',
    }
  }

  handleOnUserLogin = (user) => {
    if (user !== ''){
      this.drone = new window.Scaledrone("5D9V0tsX5DxmjSvr", {
        data: {username: user, color: randomColor()}
      });
  
      console.log('User ' + user + ' logged in');
  
      this.drone.on('open', error => {
        if (error) {
          return console.error(error);
        }
        const member = {...this.state.member};
        member.id = this.drone.clientId;
        this.setState({member});
  
        console.log('Data succesfully loaded');
  
      });
      const room = this.drone.subscribe("observable-soba");
      room.on('data', (data, member) => {
        const messages = this.state.messages;
        messages.push({member, text: data});
        this.setState({messages});
  
        console.log('Room subscribed');
  
      });

      // room.on('members', m => {
      //   console.log(m);
      // })

    }
    else {
      console.log('Enter username');
    }
  }

  handleOnUserLogout = () => {
    this.setState({member: {}});
    this.drone.close();

    console.log('User logged out');
  }

  render() {
    return (


      <div className="chat">
         <div className="App-header">
          {
            (this.state.member.id) ?
            (<h1>Chat <button className='btnLogout' onClick={this.handleOnUserLogout}>Logout</button></h1>) :
            (<h1>Chat</h1>)
          }
        </div>
         {
            (this.state.member.id) ? 
            (
            <div>
              <Messages
                messages={this.state.messages}
                currentMember={this.state.member}
              />
              <SendMessage
                onSendMessage={this.onSendMessage}
                onUserLogout={this.handleOnUserLogout}
              />
            </div>
            ) :
            (<UserLogin onUserLogin={this.handleOnUserLogin}/>)
          }
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-soba",
      message
    });
  }

}

export default Chat;