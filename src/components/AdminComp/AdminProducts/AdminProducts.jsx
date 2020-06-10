import React, { useEffect, useState } from "react";
import AdminProduct from "./AdminProduct/AdminProduct";

function AdminProducts() {
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
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:4000/products/" + id, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          console.log(response);
          productsFetch();
        }
      })
      .catch((error) => console.log("error", error));
  };
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
