import React from 'react';
import './profilepreview.css';
const Profilepreview = ({setDatas1,name,mobileno}) => {
  return (
    <div className='image-name-mobile-full-container' >
        <img className='cross-icons' onClick={event=>setDatas1({user:name,mobile_no:mobileno,cut:true})}  src='https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png' alt='cross-icon' />
      <div className='image-name-mobile'>
        <img src='https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1704009361~exp=1704009961~hmac=882a2ba36df27f67b4cdf637a33afff74764d2ea60055a570128c16b14245da5' alt='profile-view'/>
        <span>{name}</span>
        <span>+91 {mobileno}</span>
      </div>
    </div>
  )
}

export default Profilepreview
