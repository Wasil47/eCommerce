import React from "react";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
// import Home from "../pages/Home/Home";
import Admin from "../../pages/Admin/Admin";
import Products from "../../pages/Products/Products";
import Cart from "../../pages/Cart/Cart";
import ProductDetail from "../../pages/ProductDetail/ProductDetail";
import User from "../../pages/User/User";

function App() {
  return (
    <main className="container-xl" style={{ paddingTop: "5rem" }}>
      <BrowserRouter>
        <Navbar />
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/">
          <Redirect to="/products" />
        </Route>
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/user" component={User} />
      </BrowserRouter>
    </main>
  );
}

export default App;
