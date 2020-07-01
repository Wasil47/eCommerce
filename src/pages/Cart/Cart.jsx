import React, { useState, useEffect } from "react";
import "./Cart.css";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import AddressCard from "../../components/AddressCard/AddressCard";

function Cart() {
  const [showShipping, setShowShipping] = useState(true);
  // const [showFinalize, setFinalize] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // const handleClick2 = () => {
  //   console.log("pay");
  // };
  const fetchCartProducts = () => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    setProducts(cartProducts);
    // let price = 0;
    // cartProducts.forEach((p) => {
    //   return (price = price + p.quantity * p.productPrice);
    // });
    // setTotalPrice(Math.round(price * 100) / 100);
  };
  const showAddress = () => {
    setShowShipping(!showShipping);
    // setFinalize(!showFinalize);
    // setShowShipping(true);
    // setFinalize(true);
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

      {/* <button
        onClick={handleClick2}
        className="btn btn-success my-3 ml-auto"
        disabled={!showFinalize}
      >
        Finalize Order
      </button> */}
    </div>
  );
}

export default Cart;
