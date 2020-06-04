import React, { useState, useEffect } from "react";
import "./Products.css";
import Product from "./Product/Product";

function Products() {
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
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch("http://localhost:4000/products/"+id, requestOptions)
    .then(response => response.json())
    .then(response => {
      if (response.status === 'success') {
        console.log(response);
        productsFetch();
      }      
    })
    .catch(error => console.log("error", error));
  }

  return (
    <div className="container-xl">
      <div className="col">
        <h1>Products:</h1>
      </div>
      <div className="row">
        <div className="col-lg-12">
          {/* Products: */}
          <div className="row">
            {/* Product: */}
            {products.map((product) => (
              <Product product={product} 
              key={product.productId} 
              delete={productDelete} />
            ))}
            {/* Product End */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
