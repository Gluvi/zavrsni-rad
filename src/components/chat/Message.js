import React from 'react';

function Message({message}) {
    return(
        <li className=' Messages-message'>
            <div className='Message-content'>
                <h5 className='text'>{message.text}</h5>
                <h5 className='username'>{message.member.username}</h5>
            </div>
        </li>
    );
}

export default Message;