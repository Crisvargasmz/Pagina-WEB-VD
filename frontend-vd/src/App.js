import React,{useState} from 'react';
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
import Login from './pages/Login';
import Detallecompra from './pages/Detallecompra';
import Catalogo from './pages/Catalogo';
import Estadistica from './pages/Estadistica';

function App() {

const [userRol,setUserRol] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login rol={userRol} setRol={setUserRol} />} />
        <Route path="/Home" element={<Home rol={userRol} />} />
        <Route path="/about" element={<About rol={userRol} />} />
        <Route path="/Producto" element={<Producto rol={userRol} />} />
        <Route path="/Gestionproducto" element={<Gestionproducto rol={userRol}/>} />
        <Route path="/Categoria" element={<Categoria rol={userRol}/>} />
        <Route path="/Marca" element={<Marca rol={userRol}/>} />
        <Route path="/Gestioncategoria" element={<Gestioncategoria rol={userRol}/>} />
        <Route path="/Gestionmarca" element={<Gestionmarca rol={userRol}/>} />
        <Route path="/Usuario" element={<Usuario rol={userRol}/>} />
        <Route path="/Gestionusuario" element={<Gestionusuario rol={userRol}/>} />
        <Route path="/Comentario" element={<Comentario rol={userRol}/>} />
        <Route path="/Gestioncomentario" element={<Gestioncomentario rol={userRol}/>} />
        <Route path="/Detallecompra" element={<Detallecompra rol={userRol} />} />
        <Route path="/Catalogo" element={<Catalogo rol={userRol} />} />
        <Route path="/Estadistica" element={<Estadistica rol={userRol} />} />
      </Routes>
    </Router>
  );
}

export default App;
