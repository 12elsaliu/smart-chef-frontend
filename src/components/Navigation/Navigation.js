
import React from 'react';

export const Navigation = ({ isSignedIn, onRouterChange }) => {
  if (isSignedIn) {
    return (
      <nav className="fl w-60 mt4 " style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className='p3 b link dim black underline pa3 pointer' onClick={() => { onRouterChange('signin') }}>Sign Out</p>
      </nav>
    )
  } else {
    return (
      <nav className="fl w-60 mt4 " style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className='p3 b link dim black underline pa3 pointer' onClick={() => { onRouterChange('signin') }}>Sign In</p>
        <p className='p3 b link dim black underline pa3 pointer' onClick={() => { onRouterChange('register') }}>Register</p>
      </nav>
    )
  }
}
