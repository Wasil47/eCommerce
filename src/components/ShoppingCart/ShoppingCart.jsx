import React from "react";
import "./ShoppingCart.css";
import testImg from "../Products/Product/testProduct.jpg";

function ShoppingCart() {
  return (
    <div className="card">
      <div className="card-header bg-secondary text-white">
        <h5 className="mr-auto">Shopping Cart</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md">
            <img className="cartImg" src={testImg} alt="testImg" />
          </div>
          <div className="col-md">
            <h5>Product Name</h5>
            <p>Product description.</p>
          </div>
          <div className="col-md row align-items-center px-0 m-0">
            <div className="col-4">
              <div className="quantity ">
                <input type="button" value="+" className="countBtn" />
                <input
                  type="number"
                  min="1"
                  max="100"
                  step="1"
                  className="countItem text-right"
                />
                <input type="button" value="-" className="countBtn" />
              </div>
            </div>
            <div className="col-5">
              <h6 className="my-0">x $ 999.99</h6>
            </div>
            <div className="col-3">
              <button className="btn btn-outline-danger">
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <h5 className="pull-right">
          <span className="text-muted">Price: </span>$ 999.99
        </h5>
      </div>
    </div>
  );
}

export default ShoppingCart;
