import React, { Component } from 'react';
import CreateUser from '../user/createUser';
import Messages from "./messages";
import Send from "./send";

let name = 'gluvi';
let boja = 'purple';
const CHANNELID = '5D9V0tsX5DxmjSvr';

// function randomColor() {
//   return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
// }

class Messenger extends Component {
  state = {
    messages: [],
    member: {
      username: name,
      color: boja,
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone(CHANNELID, {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <CreateUser />
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Send
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default Messenger;