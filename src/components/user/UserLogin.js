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
        <div className='Messages-list'>
            <h1>User Login</h1>
            <form onSubmit={handleSubmitMemberName}>
                <input onChange={handleChangeMemberName} value={username} autoFocus={true} />
                <button type='submit' >Login</button>
            </form>
        </div>
    );
}

export default UserLogin;
