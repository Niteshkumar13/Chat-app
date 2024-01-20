import React, { useState } from 'react'
import './authentication.css';
import { useNavigate } from "react-router-dom";
const Authentication = ({ getData }) => {
  const [data, setdata] = useState({
    name: '',
    mobile_no: '',
    email: ''
  });
  const [receivedData, setReceivedData] = useState()
  const [nav, setnav] = useState(false);
  const navigate = useNavigate();
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const hello = async () => {

    if (data.mobile_no.length === 10 && isValidEmail(data.email) && data.name.length >= 4) {
      await fetch('https://s676t249-3001.inc1.devtunnels.ms/get-user-data', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(response => response.json())
        .then(datas => {
          console.log(datas); setReceivedData(datas); const c = datas.next && '/chat/home';
          getData(data);
          navigate(c);
          setdata({ ...data, name: '', email: '', mobile_no: '' })

        })
    }
    else{
      alert("fill proper data");
    }

  }
  return (
    <div className='full-screen'>
      <div className='all-input-box-container'>
        <div className='child-container'>
          <img src='https://avatar.iran.liara.run/public/25' alt='name' className='profile-pic-for-user' />
          <span className='welcome-to-chat'>Welcome to chat</span>
          <input required type="text" value={data.name} onChange={e => setdata({ ...data, name: e.target.value })} placeholder='Name' />
          <input required type="text" value={data.mobile_no} onChange={e => setdata({ ...data, mobile_no: e.target.value })} placeholder='Mobile no' />
          <input required type="text" value={data.email} onChange={e => setdata({ ...data, email: e.target.value })} placeholder='Email' />
          <button onClick={hello}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Authentication;
