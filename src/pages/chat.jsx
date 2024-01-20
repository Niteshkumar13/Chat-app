import React, { useEffect, useState, useRef } from 'react';
import './chat.css';
import pako from 'pako';
import Profilepreview from './profilepreview';
import Message from './message';
import EmojiPicker from "emoji-picker-react";
import socketIo from "socket.io-client";
import Chatuser from './chatuser';
import axios from 'axios';
let socket;

// while (mobile_no.length !== 10) {
//   user1 = prompt("enter your name");
//   mobile_no = prompt("enter your mobile no");
// }
const prevent = () => {
  var message_container = document.querySelector('.message-container');
  message_container.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });
}
const getDate = (currentDate) => {
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;;
}
let anotherid = '';
export default function Chat({data_for_user}) {
  const [showPicker, setShowPicker] = useState(false);
  const URL = 'https://s676t249-3001.inc1.devtunnels.ms/';
  const [data, setdata] = useState('');
  const [array, setarray] = useState([]);
  const [id, setid] = useState("");
  const [image, setImage] = useState(null);
  const chatContainerRef = useRef(null);
  const [data1, setData1] = useState(false);
  const [user, setuser] = useState();
  let user1 = data_for_user.name;
  let mobile_no = data_for_user.mobile_no;
  function setDatas1(x) {
    setuser(x)
    if (x.cut) {
      setData1(false)
    }
    else {

      setData1(true)
    }
  }
  const send_data = () => {
    document.querySelector(".input-box").focus();
    if (data.trim() !== '') {
      setShowPicker(false);
      const currentDate = new Date();
      const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      socket.emit('msg', {
        data: data.trim(),
        id,
        time: getDate(currentDate),
        seen: false,
        image: image ? image : null,
        link: linkRegex.test(data.trim()) ? data.trim() : false,
        mobile_no,
        video: null,
        name: user1,
        last_date:`${currentDate.getDate()<10?'0'+(currentDate.getDate()):currentDate.getDate()}/${currentDate.getMonth()+1<10?'0'+(currentDate.getMonth()+1):currentDate.getMonth()+1}/${currentDate.getFullYear()}`
      });
      setdata('');
      setImage(null);
    }
  }
  const onEmojiClick = (event, emojiObject) => {
    setdata((prevInput) => prevInput + event.emoji);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://s676t249-3001.inc1.devtunnels.ms/data',data_for_user);
        setarray(prearray => [...response.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    socket = socketIo(URL, { transports: ['websocket'] });
    socket.on('connect', () => {
      setid(socket.id);
    });
    socket.emit('joined', { user, id });


    socket.on('userJoined', (data) => {

      setarray([...array, data]);

    })

    return () => {
      socket.off();
    }
  }, []);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      send_data();
    }
  };
  useEffect(() => {
    scrollToBottom();
    socket.on('sendMessage', (data) => {
      setarray([...array, data]);
    });
    return () => {
      socket.off();
    }
  }, [array])
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }


  };
  function convertFileSize(fileSizeInBytes) {
    const fileSizeInKB = fileSizeInBytes / 1024;
    const fileSizeInMB = fileSizeInKB / 1024;
    const fileSizeInGB = fileSizeInMB / 1024;
    let size;
    if (fileSizeInKB <= 1024) {
      size = (Math.round(fileSizeInKB) < 1 ? 1 : Math.round(fileSizeInKB)) + 'kb';
    }
    else if (fileSizeInMB <= 1024) {
      size = Math.round(fileSizeInMB) + 'Mb';
    }
    else if (fileSizeInGB <= 1024) {
      size = Math.round(fileSizeInGB) + 'Gb';
    }
    return size;
  }
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      let size = convertFileSize(file.size);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageBase64 = reader.result;
        const currentDate = new Date();
        const last_date = `${currentDate.getDate()<10?'0'+(currentDate.getDate()):currentDate.getDate()}/${currentDate.getMonth()+1<10?'0'+(currentDate.getMonth()+1):currentDate.getMonth()+1}/${currentDate.getFullYear()}`
        if (imageBase64.substring(0, 11) === 'data:video/') {
          socket.emit('msg', {name: user1, id: id, image: null, video: imageBase64, time: getDate(currentDate), seen: false, mobile_no,last_date });
        }
        else if (imageBase64.substring(0, 15) === 'data:applicatio' || imageBase64.substring(0, 10) === 'data:text/') {
          socket.emit('msg', {name: user1, id: id, video: null, time: getDate(currentDate), seen: false, mobile_no, document: { file_name: file.name, size: size, data: imageBase64 },last_date });
        }
        else if (imageBase64.substring(0, 11) === 'data:audio/') {
          socket.emit('msg', {name: user1, id: id, image: null, audio: imageBase64, time: getDate(currentDate), seen: false, mobile_no,last_date, });
        }
        else {
          socket.emit('msg', {name: user1, id: id, video: null, image: imageBase64, time: getDate(currentDate), seen: false, mobile_no,last_date });
        }
      };

      reader.readAsDataURL(file);

    }
  };
  return (
    <div className='box-container'>
      <Chatuser user1={data_for_user.name}/>
      <div className='top-bottom'>
        <div onClick={prevent} className='message-container' ref={chatContainerRef}  >
          {array.map((item, i, array) => {
            const isLastMessage = item.mobile_no === mobile_no || item.mobile_no !== array[i + 1]?.mobile_no;
            const isLastdate =  item.last_date !== array[i - 1]?.last_date;
            if (anotherid !== item.mobile_no) {
              anotherid = item.mobile_no;

            }
            return (<Message setDatas1={setDatas1} last_date={isLastdate} key={i} item={item} index={i} array={array} id={id} isLastMessage={isLastMessage} link={item.link} mobile_no={mobile_no}  />)
          })}
          {data1 && <Profilepreview setDatas1={setDatas1} name={user.user} mobileno={user.mobile_no} />}

          <div className='pickerStyle-container'> {showPicker && (
            <EmojiPicker onEmojiClick={onEmojiClick} />
          )}
          </div>
        </div>
        <div className='bottom-container'>
          <div class="image-upload">
            <label for="file-input">
              <img alt="upload" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ic_attach_file_48px.svg/1200px-Ic_attach_file_48px.svg.png" />
            </label>

            <input id="file-input" type="file" onChange={handleImageUpload} />
          </div>
          <div
            className="emoji-icon"
            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
            onClick={() => setShowPicker((val) => !val)}>
            🙂
          </div>
          <input type='text' value={data} placeholder='Type message' className='input-box' onChange={e => { setdata(e.target.value) }} onKeyDown={handleKeyDown} />
          <div className='image-container' onClick={send_data}><img src='https://cdn-icons-png.flaticon.com/512/3682/3682321.png' alt='send-msg-icon' className='send-msg-icon' /></div>
        </div>
      </div>
    </div>
  )
}
