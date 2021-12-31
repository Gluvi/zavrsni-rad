import React from 'react';
import UserLogin from '../user/UserLogin';
import Messages from './Messages';
import SendMessage from './SendMessage';

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }

class Chat extends React.Component {

    state = {
        messages: [
        ],
        member: {
          username: '',
          color: '',
        }
      }

    setMember = () => {
        this.drone = new window.Scaledrone("5D9V0tsX5DxmjSvr", {
          data: this.state.member
        });
        console.log('Scaledrone connected');
        this.drone.on('open', error => {
          if (error) {
            return console.error(error);
          }
        });
      }
      
      onSendMessage = (message) => {
        const messages = this.state.messages
        if (message !== ''){
            messages.push({
                text: message,
                member: this.state.member
              })
              this.setState({messages: messages})
        }
        else{
            console.log('Prazno polje');
        }
      }

      onSubmitMember = (user) => {
        this.setState({member: {username: user, color: randomColor()}});
        console.log('Member set to ' + user);
        this.setMember();

        // DEFAULTNA PORUKA PRILIKOM LOGINA MEMBERA
        //   this.setState({messages: [
        //     {
        //         text: "Dobrodošli!",
        //         member: {
        //           color: this.state.member.color,
        //           username: user
        //         }
        //       }    
        //   ]});
      }

      onLogoutMember = () => {
        console.log('Member ' + this.state.member.username + ' logged off');
        this.setState({member: {username: ''}})
    }
    
      render() {
          return(
            <div className='App'>
                {(this.state.member.username === '') ? (
                    <div className='Messages-content'>
                        <UserLogin submitMember={this.onSubmitMember}/>
                    </div>
                ) : (
                <div className='Messages-content'>
                    <Messages
                        messages={this.state.messages}
                        currentMember={this.state.member}
                    />
                    <SendMessage
                        onSendMessage={this.onSendMessage}
                    />
                    <button onClick={this.onLogoutMember}>Logout member {this.state.member.username}</button>
                </div>
                )}
                </div>
          );
      }  
}

export default Chat;