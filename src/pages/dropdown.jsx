import React, { useState } from 'react';
import './dropdown.css';
const Dropdown = ({ name }) => {
  return (<>
    <div className='dropdown-main-container'>
      <div>
        <span>{name}</span>
      </div>
    </div>
  </>
  )
}

export default Dropdown
