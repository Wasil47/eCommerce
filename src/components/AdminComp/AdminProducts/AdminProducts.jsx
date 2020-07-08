import React, { useEffect, useState } from "react";
import AdminProduct from "./AdminProduct/AdminProduct";
import { productService } from "../../../services/product.service";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const productsFetch = () => {
    productService.getAllProducts().then((data) => {
      setProducts(data);
    });
  };

  const productDelete = (id) => {
    console.log(id);
    productService.deleteProduct(id).then((response) => {
      console.log(response.message);
      productsFetch();
    });
  };

  useEffect(() => {
    productsFetch();
  }, []);

  return (
    <div className="container px-0 mt-4">
      <div className="col">
        <h1>Products:</h1>
      </div>
      {/* Products: */}
      <div className="d-flex flex-column">
        {/* Product: */}
        {products.map((product) => (
          <AdminProduct
            product={product}
            key={product.productId}
            delete={productDelete}
            productsFetch={productsFetch}
          />
        ))}
        {/* Product End */}
      </div>
    </div>
  );
}

export default AdminProducts;
