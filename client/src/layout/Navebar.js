import React, { useContext } from "react";
import { UserContext } from "../userContext";
import SignedInmenu from "./SignedInmenu";
import SignedOutmenu from "./SignedOutmenu";

const Navebar = () => {
  const { user, setUser } = useContext(UserContext);

  const origin = "https://chat-app-mern-ll2s.onrender.com/"

  const Logout = async () => {
    try {
      const res = await fetch(origin+"logout", {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const menu = user ? <SignedInmenu Logout={Logout} /> : <SignedOutmenu />;

  return (
    <div>
      <nav className="green">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            Chat-App
          </a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">{menu}</ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        {menu}
      </ul>
    </div>
  );
};

export default Navebar;
