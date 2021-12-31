import React from 'react';
import UserLogin from '../user/UserLogin';
import Messages from './Messages';
import SendMessage from './SendMessage';

class Chat extends React.Component {

    state = {
        messages: [
          {
            text: "This is a test message!",
            member: {
              color: "blue",
              username: "bluemoon"
            }
          }
        ],
        member: {
          username: 'aa',
          color: ''
        }
      }

    constructor() {
        super();
        this.drone = new window.Scaledrone("5D9V0tsX5DxmjSvr", {
          data: this.state.member
        });
        this.drone.on('open', error => {
          if (error) {
            return console.error(error);
          }
          const member = {...this.state.member};
          member.id = this.drone.clientId;
          this.setState({member});
          console.log(member);
        });
      }
      
      onSendMessage = (message) => {
        const messages = this.state.messages
        messages.push({
          text: message,
          member: this.state.member
        })
        this.setState({messages: messages})
      }

      onSubmitMember = (user) => {
          console.log(user);
          this.setState({member: {username: user}})
      }
    
      render() {
          return(
            <div className='App'>
                <Messages
                    messages={this.state.messages}
                    currentMember={this.state.member}
                />
                <SendMessage
                    onSendMessage={this.onSendMessage}
                />
                {(this.state.member.username === 'aa') ? (<UserLogin submitMember={this.onSubmitMember}/>) : (<h5>Trenutni korisnik: {this.state.member.username}</h5>)}
                
                </div>
          );
      }  
}

export default Chat;