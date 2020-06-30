import React, { useState, useEffect } from "react";
import "./ProductsComp.css";
import Product from "./Product/Product";

function ProductsComp() {
  const [products, setProducts] = useState([]);
  const keys = ["Id", "Name", "Price", "Stock", "Image", "Description"];

  const productsFetch = () => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    productsFetch();
  }, []);

  const productDelete = (id) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:4000/products/" + id, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          console.log(response);
          productsFetch();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const addProductToCart = (product) => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    console.log(product);
    const findDuplicate = () => {
      return cartProducts.findIndex((p) => p.productId === product.productId);
    };
    const duplicateIndex = findDuplicate();
    if (duplicateIndex === -1) {
      product.quantity = 1;
      cartProducts.push(product);
    } else {
      product.quantity++;
      cartProducts.splice(duplicateIndex, 1, product);
    }
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    console.log(cartProducts);
  };

  return (
    <div className="container-xl">
      <div className="col">
        <h1>Products:</h1>
      </div>
      {/* Products: */}
      <div className="row">
        {/* Product: */}
        {products.map((product) => (
          <Product
            product={product}
            key={product.productId}
            delete={productDelete}
            toCart={addProductToCart}
          />
        ))}
        {/* Product End */}
      </div>
    </div>
  );
}

export default ProductsComp;
