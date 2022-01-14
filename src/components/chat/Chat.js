import React from 'react';
import UserLogin from '../user/UserLogin';
import MessageList from "./MessageList";
import SendMessage from './SendMessage';
import Header from '../static/Header';

let headerUserName = '';

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
      
      headerUserName = user;
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
      console.log('Room subscribed');

      room.on('data', (data, member) => {
        const messages = this.state.messages;
        messages.push({member, text: data});
        this.setState({messages});
  
        console.log('Message sent');
  
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
    this.setState({messages: [], member: {}});
    this.drone.close();

    console.log('User logged out');
  }

  render() {
    return (


      <div className="App">
        <Header 
          userName={headerUserName} 
          member={this.state.member} 
          logout={this.handleOnUserLogout} 
        />
         {
            (this.state.member.id) ? 
            (
            <div>
              <MessageList
                messages={this.state.messages}
                currentMember={this.state.member}
              />
              <SendMessage
                onSendMessage={this.onSendMessage}
                onUserLogout={this.handleOnUserLogout}
              />
            </div>
            ) :
            (
              <div>
                <div className='LoginImage'>
                  <div className='Logo'>
                  </div>
                </div>
                <UserLogin onUserLogin={this.handleOnUserLogin}/>
              </div>
            )
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