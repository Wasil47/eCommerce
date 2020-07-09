import React from "react";
import Add from "../../components/Add/Add";
import AdminProducts from "../../components/AdminComp/AdminProducts/AdminProducts";

function Admin() {
  return (
    <div className="container-xl">
      <h1>Hello Admin!</h1>
      {/* <AdminLogin logIn={logIn} /> */}
      <Add />
      <AdminProducts />
    </div>
  );
}

export default Admin;
