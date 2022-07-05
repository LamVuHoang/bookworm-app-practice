import React, { Component } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import About from './pages/About';

import Footer from './components/Footer';

class Welcome extends Component {
    render() {
        return (
            <main>
                <Header />
                <br />
                {/* <Home /> */}
                {/* <Shop /> */}
                {/* <Product /> */}
                <Cart />
                {/* <About /> */}
                <br />
                <Footer />
            </main>
        );
    }
}

export default Welcome;