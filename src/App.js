import React,{useState} from 'react';
import Chat from './pages/chat';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Authentication from './auth/authentication';

const div_style = {
  width: '100vw',
  height: '100vh',
  display: 'grid',
  placeItems: 'center'
}

const Log_out = () => {
  return (<div style={div_style}>
    <h1>🔥⚡Thanks </h1></div>
    )
}
// function Log_out
function App() {
  const[data,setdata]=useState()
  const getData = (data)=>{
   setdata(data);
    // console.log(data);
  
  }
  const prevent = () => {
    var message_container = document.querySelector('#demo-body');
    message_container.addEventListener('contextmenu', function (e) {
      // e.preventDefault();
    });
  }
  return (
    <div id='demo-body' onClick={prevent}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication getData={getData}/>} />
        <Route path="/chat/home" element={<Chat data_for_user={data}/>} />
        <Route path="/Logout" element={<Log_out />} />
      </Routes>
    </BrowserRouter>
    </div>



  );
}
export default App;