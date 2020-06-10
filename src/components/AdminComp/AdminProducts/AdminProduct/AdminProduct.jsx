import React, { useState } from "react";
import { Link } from "react-router-dom";
import testImg from "../../../Products/Product/testProduct.jpg";

function AdminProduct(props) {
  const p = props.product;
  const id = p.productId;

  const [editedProduct, setEditedProduct] = useState(p);
  const [editVisible, setEditVisible] = useState(false);

  const onEdit = () => {
    console.log("click!");
    console.log(p.productId);
    setEditVisible(!editVisible);
  };
  const onDelete = () => {
    props.delete(p.productId);
  };

  const handleChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    setEditedProduct({
      ...editedProduct,
      [key]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("A form was submitted: ", editedProduct);
    const rawData = JSON.stringify(editedProduct);
    const requestOptions = {
      method: "PATCH",
      body: rawData,
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:4000/products/" + id, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          console.log(response);
          props.productsFetch();
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="row align-items-center border-top py-1">
      <div className="col-4 col-lg-2">
        <Link to={`/products/${p.productId}`}>
          <img src={testImg} className="card-img-top" alt={p.productName} />
        </Link>
      </div>
      <div className="col-4 col-lg-1">
        <button onClick={onDelete} className="btn btn-danger btn-block px-0">
          Delete
        </button>
      </div>
      <div className="col-4 col-lg-1">
        <button
          onClick={onEdit}
          className="btn btn-warning btn-block px-0"
          data-toggle="collapse"
          data-target={"#collapse" + id}
          aria-expanded="false"
          aria-controls={"collapse" + id}
        >
          Edit
        </button>
      </div>
      <div className="col-12 col-lg-4">
        <h5>{p.productName}</h5>
      </div>
      <div className="col-6 col-lg-2">
        <p className="text-right">${p.productPrice}</p>
      </div>
      <div className="col-6 col-lg-2">
        <p className="text-right">x {p.productStock} pcs.</p>
      </div>

      <form
        className="col-12 mb-3 collapse"
        id={"collapse" + id}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="productName">Name</label>
          <input
            value={editedProduct.productName}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="productName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Price</label>
          <input
            value={editedProduct.productPrice}
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
            value={editedProduct.productStock}
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
            value={editedProduct.productDesc}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="productDesc"
            rows="4"
          />
        </div>

        <button className="btn btn-secondary pull-right">Submit changes</button>
      </form>
    </div>
  );
}

export default AdminProduct;
