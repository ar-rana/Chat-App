import React from "react";

const SignedInmenu = (props) => {
  return (
    <li>
      <a onClick={props.Logout} href="/">
        LogOut
      </a>
    </li>
  );
};

export default SignedInmenu;
