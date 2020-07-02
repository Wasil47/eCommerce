import React, { useState } from "react";
import "./Add.css";

function Add() {
  const initialnewProduct = {
    productName: "",
    productPrice: 0,
    productStock: 0,
    productImage: "",
    productDesc: "",
  };
  const initialImage = {
    file: "",
    imagePreviewUrl: "",
  };
  const [newProduct, setNewProduct] = useState(initialnewProduct);
  const [imagePreview, setImagePreview] = useState(initialImage);

  const resetForm = () => {
    setNewProduct(initialnewProduct);
    setImagePreview(initialImage);
  };

  const handleChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    setNewProduct({
      ...newProduct,
      [key]: value,
    });
  };
  const handleImageChange = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onload = () => {
      setImagePreview({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("A form was submitted: ", newProduct);
    const rawData = JSON.stringify(newProduct);
    const requestOptions = {
      method: "POST",
      body: rawData,
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:4000/products/noimage", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          console.log(response);
          resetForm();
        }
      })
      .catch((error) => console.log("error", error));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(event.target);
  //   // const fileName = event.target.productImage.files[0].name;

  //   const formData = new FormData(event.target);
  //   // formData.append('productImage', fileName)
  //   const requestOptions = {
  //     method: "POST",
  //     body: formData,
  //   };

  //   fetch("http://localhost:4000/products", requestOptions)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //       if (response.status === "success") {
  //         resetForm();
  //       }
  //     })
  //     .catch((error) => console.log("frontend error", error));
  // };

  return (
    <div className="container">
      <h2>Add new product:</h2>
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
            maxLength="12"
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
            maxLength="6"
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
        <div className="form-group">
          <label htmlFor="productImage">Image</label>
          <input
            value={newProduct.productImage}
            onChange={handleImageChange}
            type="file"
            className="form-control-file"
            name="productImage"
            accept="image/*"
            disabled
            // multiple
          />
        </div>
        <div className="form-group">
          {imagePreview.imagePreviewUrl ? (
            <img
              className="imgPreview"
              src={imagePreview.imagePreviewUrl}
              alt="imgPreview"
            />
          ) : (
            <div className="previewText">
              Please select an Image for Preview
            </div>
          )}
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
