import React, { useState } from "react";

function Login(props) {
  const initialUser = {
    login: "test",
    password: "test",
  };
  const [user, setUser] = useState(initialUser);
  const [fail, setFail] = useState(false);
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
      method: "POST",
      body: rawData,
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:4000/user/login", requestOptions)
      .then((response) => response.json()) // todo: if status==200 ->json
      .then((response) => {
        console.log(response);
        console.log(response.status);
        if (response.message === "Success Login") {
          setFail(false);
          /* TEST LOGIN  */
          props.logIn(true);
          if (response.accessToken) {
            localStorage.setItem("user", JSON.stringify(response));
          }
          
          /* TEST LOGIN END */
        } else if (response.status === "Wrong login or password") {
          setFail(true);
        }
      })
      .catch((error) => console.log("frontend error", error));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    checkUserNameLastname();
  };
  return (
    <div className="col-md-6 my-2">
      <h3 className="text-secondary">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input
            value={user.login}
            onChange={handleChange}
            type="text"
            name="login"
            className="form-control"
            required
          />
          <small className="form-text text-muted">login: test</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={user.password}
            onChange={handleChange}
            type="password"
            name="password"
            className="form-control"
            required
          />
          <small className="form-text text-muted">password: test</small>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        {fail && (
          <small className="form-text text-danger">
            Wrong login or password.
          </small>
        )}
      </form>
    </div>
  );
}

export default Login;
