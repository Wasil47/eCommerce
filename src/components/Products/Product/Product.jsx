import React from "react";

function Product(props) {
  return (
    <tr>
      {Object.keys(props.product).map((key, i) => (
        <th key={i}>{props.product[key]}</th>
      ))}
    </tr>
  );
}

export default Product;
