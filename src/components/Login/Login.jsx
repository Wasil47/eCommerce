import React, { useState } from "react";

function Login() {
  const initialUser = {
    customerName: "",
    customerLastname: "",
  };
  const [user, setUser] = useState(initialUser);
  const handleChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    setUser({
      ...user,
      [key]: value,
    });
  };
  const checkUserNameLastname = () => {
    // const formData = new FormData(event.target);
    const rawData = JSON.stringify(user);
    const requestOptions = {
      method: "GET", // dsadsad
      // body: rawData,
      // headers: {
      //   "Content-Type": "application/json",
      // },
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
    checkUserNameLastname();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="customerName">First Name (Login)</label>
        <input
          value={user.customerName}
          onChange={handleChange}
          type="text"
          name="customerName"
          className="form-control"
        />
        <small className="form-text text-muted">Your First Name is login</small>
      </div>
      <div className="form-group">
        <label htmlFor="customerLastname">Last Name (Password)</label>
        <input
          value={user.customerLastname}
          onChange={handleChange}
          type="text"
          name="customerLastname"
          className="form-control"
        />
        <small className="form-text text-muted">
          Your Lastname is password
        </small>
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}

export default Login;
