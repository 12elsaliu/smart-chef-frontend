import React from 'react';
import Tilt from 'react-tilt';
import logo from './logoBlack.png'

export const Logo = () => {

  return (
    <div className='ma3 mt0 fl w-30 tc'>
      <Tilt className="Tilt br=4 br-100" options={{ max: 40 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner center"><img className="pt4" alt='logo' src={logo} /></div>
      </Tilt>
    </div>

  )
}