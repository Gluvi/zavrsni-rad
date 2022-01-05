import React from "react";
import Message from './Message';

class Messages extends React.Component {

  render() {
    const {messages} = this.props;
    const {currentMember} = this.props;
    return (
      <div className="Messages-list">

        {messages.reverse().map((m, index) => (
          <Message key={index} message={m} member={currentMember}/>
        ))}
      </div>
    );
  }
}

export default Messages;
