import React, { useState, useEffect } from 'react';

function Header({userName, member, logout}) {
    return(
        <div className="App-header">
        {
          (member.id) ?
          (<h1 className='App-title'>{userName}, Welcome to Scaledrone chat<button className='Logout' onClick={logout}>Logout</button></h1>) :
          (<h1 className='App-title'>Welcome to Scaledrone chat</h1>)
        }
      </div>
  );
}

export default Header;