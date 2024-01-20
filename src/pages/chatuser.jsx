import React, { useState,useEffect } from 'react';
import Dropdown from './dropdown';
import './chatuser.css';

const Chatuser = ({user1}) => {
    const [data, setdata] = useState({
        source: 'https://w7.pngwing.com/pngs/163/715/png-transparent-dark-mode-moon-night-forecast-weather-multimedia-solid-px-icon.png',
        data_enable: true,
        bg: '#d3d3e0',
        chat_bg:"#e1cfb4",
        nav_color:'#f0f2f5',
        show:false
    });
    const show_dp = ()=>{
        setdata({...data,show:!data.show})
    }
    useEffect(()=>{
    const body_bg = document.querySelector("body");
    const message_container = document.querySelector(".message-container");
    const profile_name_container =document.querySelector(".profile-name-container");
    profile_name_container.style.backgroundColor=data.nav_color
    body_bg.style.backgroundColor = data.bg;
    message_container.style.backgroundColor=data.chat_bg;
},[data]);
    const change_theme = () => {
        if (data.data_enable) {
            setdata({ ...data, source: 'https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-sun-icon-png-image_3985716.jpg', data_enable: false, bg: '#696c7e',chat_bg:'#1A202C',nav_color:'#707590' });
        }
        else {
            setdata({ ...data, source: 'https://w7.pngwing.com/pngs/163/715/png-transparent-dark-mode-moon-night-forecast-weather-multimedia-solid-px-icon.png', data_enable: true, bg: '#d3d3e0',chat_bg:'#e1cfb4',nav_color:'#f0f2f5' });
        }
    };
    return (
        <div className='profile-name-container'>
            <div className='logo-name'>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><img  src='https://cdn-icons-png.flaticon.com/512/2352/2352167.png' style={{height:'60px'}}/><span className='Cimageion'>-chat</span></div>  
            <div className='moon-container'>
            
            <a href="/Logout" className='a'>Log out</a>
                <img src={data.source} alt='moon-light' onClick={change_theme} className='moon-light' />
                <img src='https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1704009361~exp=1704009961~hmac=882a2ba36df27f67b4cdf637a33afff74764d2ea60055a570128c16b14245da5' onClick={show_dp} className='profile-pic' />
                {data.show&&<Dropdown name={user1}/>}
            </div>
            </div>
        </div>
    )
}

export default Chatuser
