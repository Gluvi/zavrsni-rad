import React from "react";
import Message from './Message';

class MessageList extends React.Component {

  render() {
    const {messages} = this.props;
    const {currentMember} = this.props;
    return (
      <div className="Messages-list">

        {messages.map((m, index) => (
          <Message key={index} message={m} member={currentMember}/>
        ))}
      </div>
    );
  }
}

export default MessageList;
