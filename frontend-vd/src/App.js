import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import Login from './pages/Login';
import Detallecompra from './pages/Detallecompra';
import Catalogo from './pages/Catalogo';
import Estadistica from './pages/Estadistica';
import GestionDetalle from './pages/GestionDetallecompra';
import SinAcceso from './pages/SinAcceso';
import RegistroUsuario from './pages/RegistroUsuario';

function App() {

  const storedRol = localStorage.getItem('userRol');
  const [id_Usuario, setId_Usuario] = useState(''); 

  //const [userRol, setUserRol] = useState('');
  const [userRol, setUserRol] = useState(storedRol || '');

  // Guardar el rol del usuario en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('userRol', userRol);
  }, [userRol]);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login rol={userRol} setRol={setUserRol} setId_Usuario={setId_Usuario} />} />
        <Route path="/Home" element={userRol ? <Home rol={userRol} id_Usuario={id_Usuario} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/about" element={userRol ? <About rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/Producto" element={userRol ? <Producto rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/Gestionproducto" element={userRol ? <Gestionproducto rol={userRol}/> : <Navigate to="SinAcceso" />} />
        <Route path="/Categoria" element={userRol ? <Categoria rol={userRol}/> : <Navigate to="/SinAcceso" />} />
        <Route path="/Marca" element={userRol ? <Marca rol={userRol}/> : <Navigate to="/SinAcceso" />} />
        <Route path="/Gestioncategoria" element={userRol ? <Gestioncategoria rol={userRol}/> : <Navigate to="/SinAcceso" />} />
        <Route path="/Gestionmarca" element={userRol ? <Gestionmarca rol={userRol}/> : <Navigate to="/SinAcceso" />} />
        <Route path="/Usuario" element={userRol ? <Usuario rol={userRol}/> : <Navigate to="/SinAcceso" />} />
        <Route path="/Gestionusuario" element={userRol ? <Gestionusuario rol={userRol}/> : <Navigate to="/SinAcceso" />} />
        <Route path="/Comentario" element={userRol ? <Comentario rol={userRol}/> : <Navigate to="/SinAcceso" />} />
        <Route path="/Gestioncomentario" element={userRol ? <Gestioncomentario rol={userRol}/> : <Navigate to="/SinAcceso" />} />
        <Route path="/Detallecompra" element={userRol ? <Detallecompra rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/Catalogo" element={userRol ? <Catalogo rol={userRol} id_Usuario={id_Usuario} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/Estadistica" element={userRol ? <Estadistica rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/GestionDetallecompra" element={userRol ? <GestionDetalle rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/RegistroUsuario" element={<RegistroUsuario/>} />
        <Route path="/SinAcceso" element={<SinAcceso />} />
      </Routes>
    </Router>
  );
}

export default App;
