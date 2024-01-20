import React from 'react';
import './imagepreviewer.css';
export default function Imagepreviewer({ image, setInput,index }) {
  return (
    <div className='hello-main'>
      <div className='download-cross'>
      <a href={image} download={`Group-chat-image${index}`}><img  style={{height:'25px',width:'35px'}} src='https://static.vecteezy.com/system/resources/previews/019/879/209/original/download-button-on-transparent-background-free-png.png'/></a>
      <img className='cross-icon' onClick={setInput} src='https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png' alt='cross-icon' />
      </div>
      <img className='image' src={image} alt='image' />
    </div>
  )
}
