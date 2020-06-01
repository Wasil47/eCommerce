import React, { useState, useEffect } from "react";
import "./Products.css";
import Product from "./Product/Product";

function Products() {
  const [products, setProducts] = useState([]);
  const keys = ["Id", "Name", "Price", "Stock", "Image", "Description"];

  useEffect(() => {
    productsFetch();
  }, []);
  const productsFetch = () => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setProducts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-xl">
      <button className="btn btn-primary" onClick={productsFetch}>
        Fetch Products
      </button>
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <Product product={product} key={product.productId} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
