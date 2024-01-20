import React from 'react'
import './chat.css';
const Receivedocument = ({name,size,download_link}) => {
  return (
    <div className='message-document'>
      <img src="https://icones.pro/wp-content/uploads/2021/06/icone-fichier-document-orange.png" className='send-file-icon'/>
      <div className='name-size-container'>
        <span>{name}</span>
        <span className='file-size'>• {size}</span>
      </div>
      <a href={download_link} download={`${name}`}>
        <img src='https://static.thenounproject.com/png/3554029-200.png' className='download-btn'/>
      </a>
    </div> 
  )
}

export default Receivedocument;
