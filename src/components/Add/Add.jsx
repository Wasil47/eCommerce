import React, { useState } from "react";

function Add() {
  const initialnewProduct = {
    productName: "",
    productPrice: 0,
    productStock: 0,
    productImage: "",
    productDesc: "",
  };
  const [newProduct, setNewProduct] = useState(initialnewProduct);

  const resetForm = () => {
    setNewProduct(initialnewProduct);
  };

  const handleChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    setNewProduct({
      ...newProduct,
      [key]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('A form was submitted: ', newProduct);
    const rawData = JSON.stringify(newProduct);
    const requestOptions = {
      method: 'POST',
      body: rawData,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch("http://localhost:4000/products", requestOptions)
    .then(response => response.json())
    .then(response => {
      if (response.status === 'success') {
        console.log(response);
        resetForm();
      }      
    })
    .catch(error => console.log("error", error));
  };
  
  return (
    <div className="container">
      <h2>Add product:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Name</label>
          <input
            value={newProduct.productName}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="productName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Price</label>
          <input
            value={newProduct.productPrice}
            onChange={handleChange}
            type="number"
            className="form-control"
            name="productPrice"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productStock">Stock</label>
          <input
            value={newProduct.productStock}
            onChange={handleChange}
            type="number"
            className="form-control"
            name="productStock"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productImage">Image</label>
          <input
            type="file"
            className="form-control-file"
            name="productImage"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDesc">Description</label>
          <textarea
            value={newProduct.productDesc}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="productDesc"
            rows="4"
          />
        </div>
        <button className="btn btn-secondary">Submit</button>

        {/* {Object.keys(newProduct).map((key, index)=> (
        <div className="form-group" key={index}>
          <label htmlFor={key}>{key}</label>
          <input
            value={newProduct[key]}
            onChange={handleChange}
            type={ isNaN(newProduct[key]) ? "number" : "text"}
            className="form-control"
            name={key}
          />
        </div>
      ))} */}
      </form>
    </div>
  );
}

export default Add;
