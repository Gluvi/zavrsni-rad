import React, {useEffect} from 'react';

function Message({message, member}) {
    return(
            (message.member.id === member.id) ?
            (        
            <li className=' Messages-message currentMember'>
                <div className='Message-content'>
                    <h2 className='text' style={{backgroundColor: message.member.clientData.color}}>{message.text}</h2>
                    <h4 className='username'>Ja</h4>
                </div>
            </li>
            ) :
            (        
            <li className=' Messages-message'>
                <div className='Message-content'>
                    <h2 className='text' style={{backgroundColor: message.member.clientData.color}}>{message.text}</h2>
                    <h4 className='username'>{message.member.clientData.username}</h4>
                                    </div>
            </li>
            )
    );
}

export default Message;