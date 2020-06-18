import React, { useState, Fragment, useEffect, useLayoutEffect } from "react";
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

  //
  const checkLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log(user);
      const requestOptions = {
        method: "GET",
        headers: {
          "x-access-token": user.accessToken,
        },
      };
      fetch("http://localhost:4000/user/login", requestOptions)
        // .then((response) => response.json())
        .then((response) => {
          console.log(response);
          console.log(response.status);
          // if (response.message === "Success Login") {
          if (response.status === 200) {
            console.log("test");
            /* TEST LOGIN  */
            setLoggedIn(true);
            /* TEST LOGIN END */
          } else if (response.status === "Wrong login or password") {
            return false;
          }
        })
        .catch((error) => console.log("frontend error", error));
    }
  };
  //
  const logout = () => {
    localStorage.removeItem("user");
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

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
            <button onClick={logout} className="btn btn-danger mt-2">
              Logout
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default User;
