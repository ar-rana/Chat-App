import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../userContext";
import Roomlist from "./Roomlist";
import io from "socket.io-client";
let socket;

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState("");
  const { user, setUser } = useContext(UserContext);
  
  const ENDP = "https://chat-app-mern-ll2s.onrender.com/";

  useEffect(() => {
    socket = io.connect(ENDP);
    socket.on("connect", () => {
      console.log("connected");
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDP]);

  useEffect(() => {
    socket.on("output-rooms", (rooms) => {
      setRooms(rooms);
    });
  }, []);

  useEffect(() => {
    socket.on("room-created", (room) => {
      setRooms([...rooms, room]);
    });
  }, [rooms]);

  useEffect(() => {
    socket.on("room-created", () => {
      console.log(rooms);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("create-room", room);
    console.log(room);
    setRoom("");
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">
                Welcome {user ? user.name : ""} !!
              </span>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="text"
                      type="text"
                      className="validate"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                    />
                    <label htmlFor="text">Chat ID</label>
                  </div>
                </div>
                <div className="center-align">
                  <button className="btn align-center">Create Room</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col s6 m5 offset-1">
          <Roomlist rooms={rooms} />
        </div>
      </div>
      {/* <h1>Home {JSON.stringify(user)}</h1> */}


    </div>
  );
};

export default Home;
