import React from 'react';
import Navbar from '../components/Navbar';

class Creators extends React.Component {
    render() {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow container mx-auto p-4 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg shadow p-8 dark:bg-gray-800 h-96">
                            <h2 className="text-2xl font-semibold whitespace-nowrap dark:text-white">Aryan Vohra</h2>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg shadow p-8 dark:bg-gray-800 h-96">
                            <h2 className="text-2xl font-semibold whitespace-nowrap dark:text-white">Hardik Patel</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Creators;
