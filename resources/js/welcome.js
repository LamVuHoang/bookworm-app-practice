import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import About from "./pages/About";
import "bootstrap/dist/css/bootstrap.min.css";

class Welcome extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/shop" element={<Shop />}></Route>
                <Route path="/product/:id" element={<Product />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/about" element={<About />}></Route>
            </Routes>
        );
    }
}

export default Welcome;