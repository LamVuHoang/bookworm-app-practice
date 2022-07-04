import React, { Component } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';

class Welcome extends Component {
    render() {
        return (
            <main>
                <Header />
                <br />
                <Home />
                <br />
                <Footer />
            </main>
        );
    }
}

export default Welcome;