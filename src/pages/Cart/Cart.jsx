import React from "react";
import "./Cart.css";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import AddressCard from "../../components/AddressCard/AddressCard";

function Cart() {
  const handleClick = () => {
    console.log("shipping methods");
  };
  const handleClick2 = () => {
    console.log("pay");
  };
  return (
    <div className="d-flex flex-column">
      <ShoppingCart />
      <button onClick={handleClick} className="btn btn-info my-3 ml-auto">
        Shipping Methods
      </button>
      <AddressCard />
      <button onClick={handleClick2} className="btn btn-success my-3 ml-auto">
        Finalize Order
      </button>
    </div>
  );
}

export default Cart;
