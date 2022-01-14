import React, { useState, useEffect } from 'react';

function UserLogin({onUserLogin}) {
    const [username, setUsername] = useState('');

    const handleChangeMemberName = (e) => {
        const changeMember = e.target.value;
        setUsername(changeMember);
    }

    const handleSubmitMemberName = (e) => {
        e.preventDefault();
        onUserLogin(username.trimEnd().trimStart());
        setUsername('');
    }

    return(
        <div className='Login'>
            <h1>User Login</h1>
            <form className='EnterUsername' onSubmit={handleSubmitMemberName}>
                <input onChange={handleChangeMemberName} placeholder='Enter username and press ENTER' value={username} autoFocus={true} />
                {(username !== '') ? (<button type='submit' >Login</button>) : (<button type='submit' disabled >Login</button>)}
            </form>
        </div>
    );
}

export default UserLogin;
