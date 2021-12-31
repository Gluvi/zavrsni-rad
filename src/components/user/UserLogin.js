import React, { useState, useEffect } from 'react';

function UserLogin({submitMember}) {
    const [username, setUsername] = useState('');

    const handleChangeMemberName = (e) => {
        const changeMember = e.target.value;
        setUsername(changeMember);
    }

    const handleSubmitMemberName = (e) => {
        e.preventDefault();
        submitMember(username.trimEnd().trimStart());
        setUsername('');
    }

    return(
        <div className='userLogin'>
            <h1>User Login</h1>
            <form onSubmit={handleSubmitMemberName}>
                <input onChange={handleChangeMemberName} value={username} autoFocus={true} />
                <button type='submit' >Login</button>
            </form>
        </div>
    );
}

export default UserLogin;
