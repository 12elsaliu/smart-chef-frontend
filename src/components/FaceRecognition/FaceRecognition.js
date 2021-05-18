import React from 'react';
import './FaceRecognition.css'

export const FaceRecognition = ({ url, box }) => {

  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img alt='' src={url} width='500px' height='auto' id='inputimage' />
        <div className='bounding-box' style={{ top: box.top, right: box.right, left: box.left, bottom: box.bottom }}></div>
      </div>
    </div>

  )
}