import React, { useState } from "react";
import Add from "../../components/Add/Add";
import ProductsComp from "../../components/Products/ProductsComp";
import AdminProducts from "../../components/AdminComp/AdminProducts/AdminProducts";
import AdminLogin from "../../components/AdminComp/AdminLogin/AdminLogin";

function Admin() {
  /* TEST LOGIN */
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = (boolean) => {
    console.log(boolean);
    setLoggedIn(boolean);
  };
  /* TEST LOGIN END */
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
