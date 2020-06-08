import React from "react";
import "./Product.css";
import testImg from "./testProduct.jpg";

function Product(props) {
  const p = props.product;
  const handleClick = () => {
    console.log("click!");
    console.log(p.productImage);
  };
  const onDelete = () => {
    props.delete(p.productId);
  };
  return (
    <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 product">
        <a href="#" className="">
          <img
            // src={p.productImage}
            src={testImg}
            // src={require(`${p.productImage}`)}
            className="card-img-top"
            alt={p.productName}
          />
        </a>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{p.productName}</h5>
          <p className="card-text">${p.productPrice}</p>
          <p className="card-text">
            <small className="text-muted">
              {p.productDesc.length > 100
                ? p.productDesc.substring(0, 100) + " ..."
                : p.productDesc}
            </small>
          </p>

          <button onClick={handleClick} className="mt-auto btn btn-warning btn-block">
            Add to Cart
          </button>
          <button onClick={onDelete} className="btn btn-danger btn-block">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
