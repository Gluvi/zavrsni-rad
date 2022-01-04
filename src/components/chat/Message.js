import React from 'react';

function Message({message, member}) {
    return(
            (message.member.id !== member.id) ?
            (        
            <li className=' Messages-message currentMember'>
                <div className='Message-content'>
                    <h5 className='text' style={{backgroundColor: message.member.clientData.color}}>{message.text}</h5>
                    <h5 className='username'>{message.member.clientData.username}</h5>
                </div>
            </li>
            ) :
            (        
            <li className=' Messages-message'>
                <div className='Message-content'>
                    <h5 className='text' style={{backgroundColor: 'red'}}>{message.text}</h5>
                    <h5 className='username'>{message.member.clientData.username}</h5>
                                    </div>
            </li>
            )
    );
}

export default Message;