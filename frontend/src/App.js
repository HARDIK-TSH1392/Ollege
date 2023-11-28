// App.js

import './App.css';
import Creators from './pages/Creators';
import About from './pages/About';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container mx-auto p-4">
          {/* Navigation */}
          <nav className="flex justify-around bg-gray-800 p-4">
            <a href="/" className="text-white text-lg">Home</a>
            <a href="/about" className="text-white text-lg">About</a>
            <a href="/creators" className="text-white text-lg">Creators</a>
          </nav>

          {/* Content */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="creators" element={<Creators />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
