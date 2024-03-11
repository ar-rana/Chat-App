import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../userContext";
import { useContext } from "react";
import io from "socket.io-client";
import Messages from "./messages";
import Input from "./input";
let socket;

const Chat = () => {
  const { user, setUser } = useContext(UserContext);
  let { room_id, roomname } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDP = "http://localhost:3001";

  useEffect(() => {
    socket = io.connect(ENDP);
    socket.emit("join", { name: user.name, room_id, user_id: user._id });
    return () => {
      socket.disconnect();
    };
  }, [ENDP]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [ENDP]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      console.log(message);
      socket.emit("sendMessage", message, room_id, () => setMessage(""));
    }
  };

  return (
    <div>
      <div className="align-center">
        <br/>
        <h6>{roomname}</h6>
        <br></br>
      </div>
      <h1>Chat {JSON.stringify(user.name)}</h1>
      <div className="outerconyainer">
        <div className="container">
          <Messages messages={messages}/>
          {/* <pre>{JSON.stringify(messages, null, '\t')}</pre> */}
          <Input
            message={message}
            sendMessage={sendMessage}
            setMessage={setMessage}
          />
        </div>
      </div>
      <Link to="/">
        <button>Go back Home</button>
      </Link>
    </div>
  );
};

export default Chat;
