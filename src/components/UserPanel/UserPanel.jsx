import React, { useState } from "react";

function UserPanel() {
  const [customer, setCustomer] = useState({
    customerName: "",
    customerLastname: "",
    customerAddress: "",
    login: "",
    password: "",
  });
  const handleChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    setCustomer({
      ...customer,
      [key]: value,
    });
  };
  return (
    <div className="col my-2">
      <h3 className="text-secondary">User panel:</h3>
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h5 className="mr-auto">User details:</h5>
        </div>
        <div className="card-body">
          <form className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="customerName">Name:</label>
                <input
                  value={customer.customerName}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="customerName"
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerLastname">Lastname:</label>
                <input
                  value={customer.customerLastname}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="customerLastname"
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerAddress">Address:</label>
                <textarea
                  value={customer.customerAddress}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="customerAddress"
                  rows="4"
                  disabled
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="login">Login</label>
                <input
                  value={customer.login}
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
                  value={customer.password}
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
          <button className="btn btn-danger pull-right">Change data</button>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
