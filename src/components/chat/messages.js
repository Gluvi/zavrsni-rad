import React from "react";
import Message from './Message';
class Messages extends React.Component {
  render() {
    const {messages} = this.props;

    return (
      <div className="Messages-list">
        {messages.map((m, index) => (
          <Message key={index} message={m} />
        ))}
      </div>
    );
  }
}

export default Messages;
