import React from "react";
import AdminAddProduct from "../../components/AdminPanel/AdminAddProduct/AdminAddProduct";
import AdminProducts from "../../components/AdminPanel/AdminProducts/AdminProducts";

function Admin() {
  return (
    <div className="container-xl">
      <h1>Hello Admin!</h1>
      {/* <AdminLogin logIn={logIn} /> */}
      <AdminAddProduct />
      <AdminProducts />
    </div>
  );
}

export default Admin;
