import React, { useState, useEffect } from "react";
import "./ShoppingCart.css";
import CartProduct from "./CartProduct/CartProduct";

function ShoppingCart() {
  const initialCart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const [cartProducts, setCartProducts] = useState(initialCart);
  const [totalPrice, setTotalPrice] = useState(0);

  // const checkPrice = (price) => {
  //   setTotalPrice(price);
  // };

  // useEffect(() => {
  //   checkPrice();
  // }, []);

  return (
    <div className="card">
      <div className="card-header bg-secondary text-white">
        <h5 className="mr-auto">Shopping Cart</h5>
      </div>
      {cartProducts.map((product, index) => (
        <CartProduct product={product} key={index} />
      ))}
      <div className="card-footer">
        <h5 className="pull-right">
          <span className="text-muted">Price: </span>$
          {Math.round(totalPrice * 100) / 100}
        </h5>
      </div>
    </div>
  );
}

export default ShoppingCart;
