import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Producto from './pages/Producto';
import Gestionproducto from './pages/Gestionproducto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Producto" element={<Producto />} />
        <Route path="/Gestionproducto" element={<Gestionproducto />} />
      </Routes>
    </Router>
  );
}

export default App;
