import React, { useState } from "react";
import { UserContext } from "../../userContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const { user, setUser } = useContext(UserContext);

  const origin = "http://localhost:3001/"

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    setNameErr("");
    setEmailErr("");
    setPasswordErr("");
    console.log(name, email, password);
    try {
      const res = await fetch(origin+"signup", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data) {
        setNameErr(data.name);
        setEmailErr(data.email);
        setPasswordErr(data.password);
      }
      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2 className="center-align">SignUp</h2>
      <div className="row p2">
        <form className="col s12" onSubmit={handelSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="first_name"
                type="text"
                className="validate"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="naem error red-text">{nameErr}</div>
              <label htmlFor="name">Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                className="validate"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="naem error red-text">{passwordErr}</div>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                className="validate"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="naem error red-text">{emailErr}</div>
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <button className="wave-btn btn">SignUp</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
