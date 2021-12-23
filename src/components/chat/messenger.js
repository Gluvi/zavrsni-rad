import React, { Component } from 'react';
import Messages from "./messages";
import Send from "./send";

const CHANNELID = '5D9V0tsX5DxmjSvr';

function randomBoje() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

function randomIme() {
  const imena = [
    "Ante", "Mijo", "Ivana", "Ivan", "Anita", "Jadranka", "Mišo", "Matej",
    "Jelena", "Ivica", "Livio", "Margita", "Josipa", "Nataša", "Ana", "Lenka",
    "Valentina", "Martin", "Dario", "Mate", "Domagoj", "Maja", "Petra",
  ];
  const prezimena = [
    "Čorić", "Ivanišević", "Jelavić", "Burmaz", "Gašpar", "Barbir", "Nosić", "Leić",
    "Dugić", "Kratkić", "Širić", "Uzić", "Našić", "Vašić", "Bogunović", "Kožar",
    "Smirić", "Trzić", "Poljarić", "Stanić", "Kužić", "Malagić", "Todorić", "Paunović"
  ];
  const ime = imena[Math.floor(Math.random() * imena.length)];
  const prezime = prezimena[Math.floor(Math.random() * prezimena.length)];
  return ime + ' ' + prezime;
}

class Messenger extends Component {
  state = {
    messages: [],
    member: {
      username: randomIme(),
      color: randomBoje(),
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
          <h1>Chat - Završni ispit</h1>
        </div>
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
    this.setState({message});
  }

}

export default Messenger;