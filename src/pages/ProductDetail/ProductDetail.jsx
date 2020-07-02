import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import testImg from "../../components/Products/Product/testProduct.jpg";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
    productStock: "",
    productImage: "",
    productDesc: "",
  });

  const productFetch = () => {
    fetch("http://localhost:4000/products/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((err) => {
        console.log("product not found, ", err);
        setProduct({
          productName: "Product not found",
        });
      });
  };
  useEffect(() => {
    productFetch();
  }, []);

  const addToCart = () => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    console.log(product);
    const findDuplicate = () => {
      return cartProducts.findIndex((p) => p.productId === product.productId);
    };
    const duplicateIndex = findDuplicate();
    const findProduct = () => {
      return cartProducts.find((p) => p.productId === product.productId);
    };
    const foundProduct = findProduct();
    if (duplicateIndex === -1) {
      product.quantity = 1;
      cartProducts.push(product);
    } else {
      product.quantity = foundProduct.quantity + 1;
      cartProducts.splice(duplicateIndex, 1, product);
    }
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    console.log(cartProducts);
  };
  return (
    <div className="row border rounded">
      <div className="col-md-5">
        <img src={testImg} className="card-img-top" alt={product.productName} />
      </div>
      <aside className="col-md-7 d-flex flex-column p-3">
        <h3>{product.productName}</h3>
        <h4 className="text-info">$ {product.productPrice}</h4>
        <p className="text-muted">stock: {product.productStock}</p>
        <dl className="mt-1">
          <dt>Description:</dt>
          <dd>{product.productDesc}</dd>
        </dl>
        <button
          onClick={addToCart}
          className="mt-auto btn btn-warning font-weight-bold"
        >
          <i
            className="fa fa-shopping-cart px-3"
            aria-hidden="true"
            style={{ fontSize: "1.3rem" }}
          />
          ADD TO CART
        </button>
      </aside>
    </div>
  );
}

export default ProductDetail;