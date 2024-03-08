import React, { useContext } from "react";
import { UserContext } from "../userContext";

const Navebar = () => {
  const { user, setUser } = useContext(UserContext);

  const Logout = async () => {
    try {
      const res = await fetch("http://localhost:3001/logout", {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  //logout set nahi hua hai abhi onClick pe pehle jwt token wala problem thik kar

  return (
    <div>
      <nav className="green">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            Logo
          </a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a href="/login">LogIn</a>
            </li>
            <li>
              <a href="/signup">SignUp</a>
            </li>
            <li>
              <a onClick={Logout} href="/">
                LogOut
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="/login">LogIn</a>
        </li>
        <li>
          <a href="/signup">SignUp</a>
        </li>
        <li onClick={Logout}>
          <a href="/">LogOut</a>
        </li>
      </ul>
    </div>
  );
};

export default Navebar;
