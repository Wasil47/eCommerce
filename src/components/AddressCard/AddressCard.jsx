import React, { useState } from "react";

function AddressCard() {
  const [customer, setCustomer] = useState({
    customerName: "",
    customerLastname: "",
    customerAddress: "",
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
    <div className="card">
      <div className="card-header bg-secondary text-white">
        <h5 className="mr-auto">Shipping Address</h5>
      </div>
      <div className="card-body row">
        <form className="col-md-6">
          <div className="form-group">
            <label htmlFor="customerName">Name:</label>
            <input
              value={customer.customerName}
              onChange={handleChange}
              type="text"
              className="form-control"
              name="customerName"
              required
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
              required
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
              required
            />
          </div>
        </form>
        <div className="col-md-6 d-flex flex-column">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center py-1">
              ItemName1<span className="badge badge-primary badge-pill">2</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center py-1">
              {"WdsagdasrewWWWWWWe1ItemName1ItemName1".substring(0, 12) +
                " ..."}
              <span className="badge badge-primary badge-pill">234</span>
            </li>
          </ul>
          <fieldset className="form-group mt-4">
            <div className="row">
              <legend className="col-form-label col-6">Shipping method:</legend>
              <div className="col-6">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="orderShipping"
                    value="DHL"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    DHL - $0
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="orderShipping"
                    value="DPD"
                    disabled
                  />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    DPD - $0
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="card-footer">
        <h5 className="pull-right">
          <span className="text-muted">Total price: </span>$ 999.99
        </h5>
      </div>
    </div>
  );
}

export default AddressCard;
