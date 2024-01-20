import React, { useState,useRef } from 'react';
import './chat.css';
import Receivedocument from './receivedocument';
import Imagepreviewer from './imagepreviewer';
export default function Message({ item, index, i, id, isLastMessage, link, mobile_no, setDatas1,last_date}) {
    const [data, setData] = useState(false);
    function transition(item) {
        setDatas1({ user: item.name, mobile_no: item.mobile_no });
    }
    function setDatas() {
        setData(!data);
    }
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const audioRefs = useRef([]);

    return (
        <div>
             {last_date&&<div className='date-month-container'>
                <span className='date-month'>{item.last_date}</span>
             </div>}
            <div className={`icon-last-msg ${item.mobile_no === mobile_no ? 'right' : 'left'}`} style={{ flexDirection: item.mobile_no === mobile_no && isLastMessage ? 'row-reverse' : 'row' }}>
                <div className={`message ${item.mobile_no === mobile_no ? 'rights' : 'lefts'}`} key={i}>
                    {/* <Receivedocument/> */}
                    {item.document ? <Receivedocument name={item.document.file_name} size={item.document.size} download_link={item.document.data} /> : (item.image || item.video||item.audio ?
                        (item.video ? <>
                            <video className='video' controls="controls">
                                <source src={item.video} type="video/mp4" />
                            </video>
                            
                                </> :
                                item.audio ? <audio ref={(ref) => (audioRefs.current[index] = ref)} controls preload="auto" className={item.mobile_no === mobile_no ? 'right_audio' : 'left_audio'}>
                                    <source  src={item.audio} type="audio/mp3"/>
                                </audio>  :<div style={{ backgroundImage: `url(${item.image})` }} key='user-uploaded' onClick={e => setData(!data)} className='uploaded-image'>
                                    <span className='date-time image-time'>{item.time}</span>
                                </div>
                                ) : (
                                item.link ? <a href={`${item.link}`} rel="noopener noreferrer" className='user-input-link' target='__blank'>{link}</a> : item.data)
                    )}

                                {data && <Imagepreviewer index={index} image={item.image} setInput={setDatas} />}
                                {(!item.image && !item.video) && <span className='date-time'>{item.time}</span>}
                            </div>
                            {/* onClick={event=>setDatas1({user:item.user,mobile_no:item.mobile_no})} */}
                            {item.mobile_no !== mobile_no && isLastMessage && <img onClick={event => transition(item)} src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg' className='emoji-last-msg' alt={`demo-${index}`} />}

                        </div>
                </div>
                )
}
