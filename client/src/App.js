import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/chat/chat.js";
import Home from "./components/home/home.js";
import React, { useEffect, useState } from "react";
import { UserContext } from "./userContext";
import Navebar from "./layout/Navebar.js";
import Signup from "./components/auth/Signup.js";
import Login from "./components/auth/Login.js";

function App() {
  const [user, setUser] = useState("");

  const origin = "https://chat-app-mern-ll2s.onrender.com/"

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(origin+"verifyuser", {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Navebar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/chat/:room_id/:roomname" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
