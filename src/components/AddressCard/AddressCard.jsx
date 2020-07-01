import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

function AddressCard(props) {
  // const [showFinalize, setFinalize] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    customerName: "",
    customerLastname: "",
    customerAddress: "",
  });
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
            // setFinalize(true);
            return response.json();
          }
        })
        .then((data) => {
          if (data) {
            setUserData(data);
            setLoggedIn(true);
          }
          // setLoading(false);
        })
        .catch((error) => console.log("frontend error", error));
    } else {
      // setLoading(false);
    }
  };
  const createNewOrder = () => {
    const numberDate = Math.round(Date.now()/1000);
    const orderData = {
      orderNumber: numberDate,
      orderCustomerId: userData.customerId,
      orderAmount: props.totalPrice,
      orderAddress: userData.customerAddress,
    };
    const rawData = JSON.stringify(orderData);
    const requestOptions = {
      method: "POST",
      body: rawData,
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:4000/orders/create", requestOptions)
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          localStorage.removeItem("cartProducts");
          window.location.reload(false);
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data) {
          // localStorage.removeItem("cartProducts");
        }
        // setLoading(false);
      })
      .catch((error) => console.log("frontend error", error));
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const handleChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    setUserData({
      ...userData,
      [key]: value,
    });
  };
  return (
    <Fragment>
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h5 className="mr-auto">Shipping Address</h5>
        </div>
        <div className="card-body row">
          <form className="col-md-6">
            <div className="form-group">
              <label htmlFor="customerName">Name:</label>
              <input
                value={userData.customerName}
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
                value={userData.customerLastname}
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
                value={userData.customerAddress}
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
              {props.products.map((p) => {
                return (
                  <li
                    key={p.productId}
                    className="list-group-item d-flex justify-content-between align-items-center py-1"
                  >
                    {p.productName.length > 14
                      ? p.productName.substring(0, 12) + " ..."
                      : p.productName}
                    <span className="badge badge-primary badge-pill">
                      {p.quantity}
                    </span>
                  </li>
                );
              })}
            </ul>
            <fieldset className="form-group mt-4">
              <div className="row">
                <legend className="col-form-label col-6">
                  Shipping method:
                </legend>
                <div className="col-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="orderShipping"
                      value="20"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      DHL - $0
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="orderShipping"
                      value="10"
                      disabled
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
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
            <span className="text-muted">Total price: </span>${props.totalPrice}
          </h5>
        </div>
      </div>
      <div className="my-3 ml-auto d-flex flex-row">
        {!loggedIn && (
          <Link
            to={`/user/`}
            style={{ color: "#f75050", textDecoration: "none" }}
            className="form-text text-danger mx-2"
          >
            <small className="align-middle">Login to continue</small>
          </Link>
        )}
        <button
          onClick={createNewOrder}
          className="btn btn-success"
          disabled={!loggedIn}
        >
          Finalize Order
        </button>
      </div>
    </Fragment>
  );
}

export default AddressCard;
