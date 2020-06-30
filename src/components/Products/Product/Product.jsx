import React from "react";
import "./Product.css";
import testImg from "./testProduct.jpg";
import { Link } from "react-router-dom";

function Product(props) {
  const p = props.product;
  const onDelete = () => {
    props.delete(p.productId);
  };
  const addToCart = () => {
    props.toCart(p);
    console.log("click!");
    // console.log(p);
  };

  return (
    <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 product">
        {/* <a href="#" className=""> */}
        <Link to={`/products/${p.productId}`}>
          <img
            // src={p.productImage ? p.productImage : testImg}
            src={testImg}
            // src={require(`${p.productImage}`)}
            className="card-img-top"
            alt={p.productName}
          />
        </Link>
        {/* </a> */}
        <div className="card-body d-flex flex-column">
          <Link
            to={`/products/${p.productId}`}
            style={{ color: "#000", textDecoration: "none" }}
          >
            <h5 className="card-title">{p.productName}</h5>
          </Link>
          <p className="card-text">${p.productPrice}</p>
          <p className="card-text">
            <small className="text-muted">
              {p.productDesc.length > 100
                ? p.productDesc.substring(0, 100) + " ..."
                : p.productDesc}
            </small>
          </p>

          <button
            onClick={addToCart}
            className="mt-auto btn btn-warning btn-block"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
