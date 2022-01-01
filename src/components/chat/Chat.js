import React from 'react';
import UserLogin from '../user/UserLogin';
import Messages from './Messages';

const drone = new window.Scaledrone('5D9V0tsX5DxmjSvr');

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
  }

  handleLogoutMember = () => {
    this.setState({member: {username: '', color: 'red'}});
    console.log('Member ' + this.state.member.username +' logged out');
  }

  render() {

    return(
      <div>
        <h1>Chat</h1>
        {(this.state.member.username !== '') ? (
          <div>
            <Messages messages={this.state.messages} />
            <button onClick={this.handleLogoutMember}>Logout</button>
          </div>
        ) : (<UserLogin submitMember={this.handleSubmitMember} />)}
        
      </div>
    );
  }
}

export default Chat;