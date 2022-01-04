import React from 'react';

function Message({message, member}) {
    return(
        <li className=' Messages-message'>
            <div className='Message-content'>
                <h5 className='text'>{message.text}</h5>
                <h5 className='username'>{member.color}</h5>
            </div>
        </li>
    );
}

export default Message;