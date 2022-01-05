import React from 'react';

function Header({userName, member, logout}) {
    return(
        <div className="App-header">
        {
          (member.id) ?
          (<h1 className='App-title'>Welcome {userName}<button className='Logout' onClick={logout}>Logout</button></h1>) :
          (<h1 className='App-title'>Završni rad - Chat app</h1>)
        }
      </div>
  );
}

export default Header;