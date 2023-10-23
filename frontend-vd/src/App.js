import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Producto from './pages/Producto';
import Gestionproducto from './pages/Gestionproducto';
import Categoria from './pages/Categoria';
import Marca from './pages/Marca';
import Gestioncategoria from './pages/Gestioncategoria';
import Gestionmarca from './pages/Gestionmarca';
import Usuario from './pages/Usuario';
import Gestionusuario from './pages/Gestionusuario';
import Comentario from './pages/Comentario';
import Gestioncomentario from './pages/Gestioncomentario';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Producto" element={<Producto />} />
        <Route path="/Gestionproducto" element={<Gestionproducto />} />
        <Route path="/Categoria" element={<Categoria/>} />
        <Route path="/Marca" element={<Marca/>} />
        <Route path="/Gestioncategoria" element={<Gestioncategoria/>} />
        <Route path="/Gestionmarca" element={<Gestionmarca/>} />
        <Route path="/Usuario" element={<Usuario/>} />
        <Route path="/Gestionusuario" element={<Gestionusuario/>} />
        <Route path="/Comentario" element={<Comentario/>} />
        <Route path="/Gestioncomentario" element={<Gestioncomentario/>} />
      </Routes>
    </Router>
  );
}

export default App;
