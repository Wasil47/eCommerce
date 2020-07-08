import React, { useState, useEffect } from "react";
import "./Cart.css";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import AddressCard from "../../components/AddressCard/AddressCard";

function Cart() {
  const [showShipping, setShowShipping] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartProducts = () => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    setProducts(cartProducts);
  };
  const showAddress = () => {
    setShowShipping(!showShipping);
    fetchCartProducts();
  };
  const setPrice = (price) => {
    setTotalPrice(price);
  };
  useEffect(() => {
    fetchCartProducts();
  }, []);
  return (
    <div className="d-flex flex-column">
      <ShoppingCart setPrice={setPrice} refresh={fetchCartProducts} />
      <button onClick={showAddress} className="btn btn-info my-3 ml-auto">
        {/* {showShipping ? "Refresh" : "Shipping Methods"} */}
        Shipping Methods
      </button>
      {showShipping && (
        <AddressCard products={products} totalPrice={totalPrice} />
      )}
    </div>
  );
}

export default Cart;
