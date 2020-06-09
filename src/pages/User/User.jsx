import React from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

function User() {
  return (
    <div className="container-xl">
      <h1>Hello User!</h1>
      <div className="row">
        <div className="col-md-6 my-2">
          <h3 className="text-secondary">Login</h3>
          <Login />
        </div>
        <div className="col-md-6 my-2">
          <h3 className="text-secondary">Register</h3>
          <Register />
        </div>
      </div>
    </div>
  );
}

export default User;
