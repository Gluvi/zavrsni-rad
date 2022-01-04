import React from 'react';
import UserLogin from '../user/UserLogin';
import Messages from './Messages';
import SendMessage from './SendMessage';

// const drone = new window.Scaledrone('5D9V0tsX5DxmjSvr');
const soba = 'observable-soba';

class Chat extends React.Component {
  state = {
    messages: [],
    member: {
      username: '',
      color: '',
    }
  }
  
  handleSubmitMember = (memberName) => {
    this.setState({member: {username: memberName, color: 'pink'}});

    this.drone = new window.Scaledrone("5D9V0tsX5DxmjSvr", {
      data: this.state.member,
    });
    console.log('Member ' + memberName +' logged in');
  }

  handleLogoutMember = () => {
    this.setState({member: {username: '', color: 'red'}});
    console.log('Member ' + this.state.member.username +' logged out');
  }

  handleSendMessage = (message) => {

    this.drone.on('open', error => {
      if(error){
        return console.error(error);
      }

      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });

    const room = this.drone.subscribe(soba);
    room.on('data', (data, id, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data, id: id});
      this.setState({messages});
      console.log('********');
      console.log({messages});
      console.log('********');
  
    });

    this.drone.publish({
      room: soba,
      message,
    });
  }

  render() {
        
    return(
      <div>
        {(this.state.member.username !== '') ? (
          <div>
            <Messages messages={this.state.messages} currentMember={this.state.member} />
            <SendMessage onSendMessage={this.handleSendMessage} />
            <button onClick={this.handleLogoutMember}>Logout</button>
          </div>
        ) : (<UserLogin submitMember={this.handleSubmitMember} />)}
        
      </div>
    );
  }
}

export default Chat;