import React, { useState, Fragment } from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import UserPanel from "../../components/UserPanel/UserPanel";

function User() {
  /* TEST LOGIN  */
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = (boolean) => {
    console.log(boolean);
    setLoggedIn(boolean);
  };
  /* TEST LOGIN END */

  return (
    <div className="container-xl">
      <h1>Hello User!</h1>
      <div className="row">
        {loggedIn ? (
          <UserPanel />
        ) : (
          <Fragment>
            <Login logIn={logIn} />
            <Register />
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default User;
