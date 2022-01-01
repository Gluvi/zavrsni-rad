import React from 'react';
import UserLogin from '../user/UserLogin';
import Messages from './Messages';
import SendMessage from './SendMessage';

const drone = new window.Scaledrone('5D9V0tsX5DxmjSvr');
const soba = 'observable-soba';

class Chat extends React.Component {
  state = {
    messages: [
      {
        text: "This is a test message!",
        member: {
          color: "blue",
          username: "bluemoon",
        }
      }
    ],
    member: {
      username: '',
      color: 'red',
    }
  }

  componentDidMount(){
    drone.on('open', error => {
      // Connection has been opened if no error
      console.log('Succesfully connected to the Scaledrone');
    });
  }
  
  handleSubmitMember = (memberName) => {
    this.setState({member: {username: memberName, color: 'blue'}});
    console.log('Member ' + memberName + ' logged in');

    const room = drone.subscribe(soba);
    room.on('open', error => {
      if (error) {
        return console.error(error);
      }
      // Connected to room
      console.log('Connected to the room ' + room.name);
    });

    room.on('message', message => {
      // Received message from room
      console.log(message);
    });

  }

  handleLogoutMember = () => {
    this.setState({member: {username: '', color: 'red'}});
    console.log('Member ' + this.state.member.username +' logged out');
  }

  handleSendMessage = (message) => {
    drone.publish({
      room: soba,
      message: {text: message, member: this.state.member}
    });
  }

  render() {
    drone.on('error', error => {
      // An error has occurred with the connection
      console.log(error);
    });
        
    return(
      <div>
        <h1>Chat</h1>
        {(this.state.member.username !== '') ? (
          <div>
            <Messages messages={this.state.messages} />
            <SendMessage onSendMessage={this.handleSendMessage} />
            <button onClick={this.handleLogoutMember}>Logout</button>
          </div>
        ) : (<UserLogin submitMember={this.handleSubmitMember} />)}
        
      </div>
    );
  }
}

export default Chat;