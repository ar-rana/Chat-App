import React from 'react';
import "./message.css";

const message = ({message:{name,user_id,text},current_uid}) => {
  let iscurrentUser = false;
  if (user_id === current_uid){
    iscurrentUser = true;
  }
  return (
    iscurrentUser ? (<div classname="row right-align">
      <div className='bubble col s12 m8 16 right'>
        <p className='sentbyme'>{name}:  {text}</p>
      </div>
    </div>) : (<div className='bubble row left-align'>
      <p className='sentbyother'>{text}: {name}</p>
    </div>)
    
  )
}

export default message
