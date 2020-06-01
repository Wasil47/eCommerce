import React from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Admin from "../pages/Admin/Admin";
import Products from "./Products/Products";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/admin" component={Admin} />
      </BrowserRouter>
    </main>
  );
}

export default App;
