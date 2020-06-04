import React from "react";
import "./Product.css";

function Product(props) {
  const p = props.product;
  const handleClick = () => {
    console.log("click!");
  };
  const onDelete = () => {
    props.delete(p.productId);
  }
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card product">
        <a href="#" className="">
          <img
            src={p.productImage}
            className="card-img-top"
            alt={p.productName}
          />
        </a>
        <div className="card-body">
          <h5 className="card-title">{p.productName}</h5>
          <p className="card-text">${p.productPrice}</p>
          <p className="card-text">
            <small className="text-muted">{p.productDesc}</small>
          </p>

          <button onClick={handleClick} className="btn btn-warning">
            Add to Cart
          </button>
          <button onClick={onDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
