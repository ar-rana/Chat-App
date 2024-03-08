import React from 'react';
import Message from './message';

const messages = ({messages, user_id}) => {
  return (
    <div>
      Messages {user_id}
      {/* {JSON.stringify(messages)} */}
      {messages.map((message, i)=>(
        <Message key={message.id} message={message} current_uid={user_id}/>
        ))}
    </div>
  )
}

export default messages
