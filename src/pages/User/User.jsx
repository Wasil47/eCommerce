import React, { useState, Fragment, useEffect, useLayoutEffect } from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import UserPanel from "../../components/UserPanel/UserPanel";

function User(props) {
  /* TEST LOGIN  */
  const initialUser = {
    customerId: "",
    customerName: "",
    customerLastname: "",
    customerAddress: "",
    login: "",
    password: "",
  };
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(initialUser);
  const [userOrders, setUserOrders] = useState([]);
  const logIn = (boolean) => {
    setLoggedIn(boolean);
    window.location.reload();
  };
  /* TEST LOGIN END */

  //
  const checkLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const requestOptions = {
        method: "GET",
        headers: {
          "x-access-token": user.accessToken,
        },
      };
      fetch("http://localhost:4000/user/login", requestOptions)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          if (data) {
            setUserData(data);
            setLoggedIn(true);
          }
          setLoading(false);
        })
        .catch((error) => console.log("frontend error", error));
    } else {
      setLoading(false);
    }
  };
  //
  const fetchUserOrders = () => {
    if (loggedIn) {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(
        "http://localhost:4000/orders/" + userData.customerId,
        requestOptions
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          if (data) {
            setUserOrders(data);
          }
        })
        .catch((error) => console.log("frontend error", error));
    }
  };
  //

  useEffect(() => {
    checkLoggedIn();
    fetchUserOrders();
  }, []);

  return (
    <Fragment>
      {!loading && (
        <div className="container-xl">
          <h1>
            Hello {userData.customerName ? userData.customerName : "User"}!
          </h1>
          <div className="row">
            {loggedIn ? (
              <UserPanel
                logIn={loggedIn}
                userData={userData}
                userOrders={userOrders}
                fetchUserOrders={fetchUserOrders}
              />
            ) : (
              <Fragment>
                <Login logIn={logIn} />
                <Register />
              </Fragment>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default User;
