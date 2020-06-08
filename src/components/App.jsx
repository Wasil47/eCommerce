import React from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Admin from "../pages/Admin/Admin";
import Products from "./Products/Products";
import Cart from "../pages/Cart/Cart";

function App() {
  return (
    <main className="container" style={{ paddingTop: "5rem" }}>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/cart" component={Cart} />
      </BrowserRouter>
    </main>
  );
}

export default App;
