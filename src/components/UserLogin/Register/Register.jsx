import React, { useState } from "react";

function Register() {
  const initialUser = {
    login: "",
    password: "",
    customerName: "",
    customerLastname: "",
    customerAddress: "",
  };
  const [newUser, setNewUser] = useState(initialUser);
  const handleChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    setNewUser({
      ...newUser,
      [key]: value,
    });
  };
  const resetForm = () => {
    setNewUser(initialUser);
  };
  const createNewUser = () => {
    // const formData = new FormData(event.target);
    const rawData = JSON.stringify(newUser);
    const requestOptions = {
      method: "POST",
      body: rawData,
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:4000/user/register", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === "success") {
          resetForm();
        } else if (response.status === "user exist") {
          alert("Login is taken!");
        }
      })
      .catch((error) => console.log("frontend error", error));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createNewUser();
  };
  return (
    <div className="col-md-6 my-2">
      <h3 className="text-secondary">Register</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input
            value={newUser.login}
            onChange={handleChange}
            type="text"
            name="login"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={newUser.password}
            onChange={handleChange}
            type="password"
            name="password"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerName">First Name</label>
          <input
            value={newUser.customerName}
            onChange={handleChange}
            type="text"
            name="customerName"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerLastname">Last Name</label>
          <input
            value={newUser.customerLastname}
            onChange={handleChange}
            type="text"
            name="customerLastname"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerAddress">Address:</label>
          <textarea
            value={newUser.customerAddress}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="customerAddress"
            rows="2"
          />
          <small className="form-text text-muted">
            Shipping address - You can set it any time.
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
