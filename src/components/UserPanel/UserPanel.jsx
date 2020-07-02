import React, { useState, useEffect } from "react";
import OrderDetails from "./OrderDetails/OrderDetails";

function UserPanel(props) {
  const initialUser = {
    customerName: "",
    customerLastname: "",
    customerAddress: "",
    login: "",
    password: "",
  };
  const [user, setUser] = useState(initialUser);
  useEffect(() => {
    props.fetchUserOrders();
    setUser(props.userData);
  }, []);

  const updateUserData = () => {
    const rawData = JSON.stringify(user);
    const requestOptions = {
      method: "PATCH",
      body: rawData,
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:4000/user/authorized", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => console.log(data.message))
      .catch((error) => console.log("frontend error", error));
  };

  const handleChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    setUser({
      ...user,
      [key]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserData();
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="col my-2">
      <h3 className="text-secondary">User panel:</h3>

      {/* USER DATA */}
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h5 className="mr-auto">User details:</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row" id="update-user-form">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="customerName">Name:</label>
                <input
                  value={user.customerName}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="customerName"
                  // disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerLastname">Lastname:</label>
                <input
                  value={user.customerLastname}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="customerLastname"
                  // disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerAddress">Address:</label>
                <textarea
                  value={user.customerAddress}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="customerAddress"
                  rows="4"
                  // disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="login">Login</label>
                <input
                  value={user.login}
                  onChange={handleChange}
                  type="text"
                  name="login"
                  className="form-control"
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  value={user.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  className="form-control"
                  disabled
                />
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <button
            type="submit"
            form="update-user-form"
            className="btn btn-danger pull-right"
          >
            Change data
          </button>
        </div>
      </div>

      {/* ORDERS */}
      <div className="card mt-2">
        <div className="card-header bg-secondary text-white">
          <h5 className="mr-auto">User orders:</h5>
        </div>
        <div className="card-body">
          <div className="d-flex flex-column">
            {/* Order: */}
            <div className="row align-items-center">
              <div className="col-4 col-lg-2">
                <small>Number</small>
              </div>
              <div className="col-4 col-lg-5">
                <small>Address</small>
              </div>
              <div className="col-4 col-lg-2">
                <small>Total Price</small>
              </div>
            </div>
            {props.userOrders.map((order) => (
              <OrderDetails
                order={order}
                key={order.orderId}
                // delete={orderDelete}
              />
            ))}
            {/* Order End */}
          </div>
        </div>
        <div className="card-footer">
          <button
            onClick={props.fetchUserOrders}
            className="btn btn-primary pull-right"
          >
            Refresh
          </button>
        </div>
      </div>
      <button onClick={logout} className="btn btn-danger mt-2">
        Logout
      </button>
    </div>
  );
}

export default UserPanel;