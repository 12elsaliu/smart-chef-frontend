import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'

export const Logo = () => {

  return (
    <div className='ma5 mt0 '>
      <Tilt className="Tilt br=4 shadow-2 br-100" options={{ max: 40 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner"> 👽 </div>
      </Tilt>
    </div>

  )
}