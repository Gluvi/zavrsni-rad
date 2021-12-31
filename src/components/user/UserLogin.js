import React, { useState } from 'react';
import PropTypes from 'prop-types'

function UserLogin({submitMember}) {
    const [username, setUsername] = useState('');

    const handleChangeMemberName = (e) => {
        const changeMember = e.target.value;
        setUsername(changeMember);
        console.log(changeMember);
    }

    const handleSubmitMemberName = (e) => {
        e.preventDefault();
        console.log('********');
        console.log(username);
        console.log('********');
        submitMember(username);
        setUsername('');
    }

    return(
        <div className='userLogin'>
            <h1>User Login</h1>
            <form onSubmit={handleSubmitMemberName}>
                <input onChange={handleChangeMemberName} value={username} />
                <button type='submit' >Add User</button>
                <h5></h5>
            </form>
        </div>
    );
}

export default UserLogin;

// UserLogin.propTypes = {
//     submitUsername: PropTypes.func.isRequired;
// }