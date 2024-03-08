import React from "react";
import "./input.css";

const input = ({ message,setMessage,sendMessage }) => {
  return (
    <div className="inputbox">
      <form onSubmit={sendMessage}>
        <input
          className="input"
          placeholder="Type a message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? setMessage(message) : null)}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default input;
