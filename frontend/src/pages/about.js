import React from 'react';
import Navbar from '../components/Navbar';

class About extends React.Component {
    render() {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow container mx-auto p-4 md:p-8">
                    <h1 className="text-4xl font-bold mb-4">About</h1>
                    {/* Add your additional content here */}
                </div>
            </div>
        );
    }
}

export default About;
