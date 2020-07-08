import React, { useState, useEffect } from "react";
import "./ProductsComp.css";
import Product from "./Product/Product";

import { cartService } from "../../services/cart.service";
import { productService } from "../../services/product.service";

function ProductsComp() {
  const [products, setProducts] = useState([]);

  const productsFetch = () => {
    productService.getAllProducts().then((data) => {
      setProducts(data);
    });
  };

  const productDelete = (id) => {
    console.log(id);
    productService.deleteProduct(id).then((data) => {
      console.log(data.message);
      productsFetch();
    });
  };

  const addProductToCart = (product) => {
    cartService.addProductToCart(product);
    console.log("Add to Cart: " + product.productName);
  };

  useEffect(() => {
    productsFetch();
  }, []);

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
