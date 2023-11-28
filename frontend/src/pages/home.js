import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

class Home extends React.Component {
    render() {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <Hero />
            </div>
        );
    }
}

export default Home;
