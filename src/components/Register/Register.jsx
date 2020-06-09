import React, { useState } from "react";

function Register() {
  const initialUser = {
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
    fetch("http://localhost:4000/user", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === "success") {
          // resetForm();
        }
      })
      .catch((error) => console.log("frontend error", error));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createNewUser();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="customerName">First Name (Login)</label>
        <input
          value={newUser.customerName}
          onChange={handleChange}
          type="text"
          name="customerName"
          className="form-control"
          required
        />
        <small className="form-text text-muted">Your First Name is login</small>
      </div>
      <div className="form-group">
        <label htmlFor="customerLastname">Last Name (Password)</label>
        <input
          value={newUser.customerLastname}
          onChange={handleChange}
          type="text"
          name="customerLastname"
          className="form-control"
          required
        />
        <small className="form-text text-muted">
          Your Lastname is password
        </small>
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
  );
}

export default Register;
