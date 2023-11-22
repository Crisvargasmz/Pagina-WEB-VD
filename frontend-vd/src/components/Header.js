import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../Logo/logo.png';
import { FaRightFromBracket } from 'react-icons/fa6';

function Header({ rol }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const cerrarSesion = () => {
    // Eliminar el rol del localStorage al cerrar sesión
    localStorage.removeItem('userRol');
  };


  return (
    <div>

      {rol === 'admin' && (

        <div>
          <Navbar className="navbar-color" variant="dark" expand="md" fixed='top'>
            <Container>
              <Link to="/home" className="navbar-brand">
                <img src={logo} alt="Logo de Variedades Duarte" className="logo-img" />
              </Link>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ display: 'none' }}
                className="d-sm-none d-xs-none"
              />

              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">

                  <Nav.Link>
                    <Link to="/about" className="link-unstyled">Informacion</Link>
                  </Nav.Link>

                  <NavDropdown title="Producto" id="producto">
                    <NavDropdown.Item>
                      <Link to="/Producto" className="link-unstyled">Registrar Producto </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/Categoria" className="link-unstyled">Registrar Categoría</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/Marca" className="link-unstyled">Registrar Marca</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/Gestionproducto" className="link-unstyled">Productos</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/Gestioncategoria" className="link-unstyled">Categorias</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/Gestionmarca" className="link-unstyled">Marcas</Link>
                    </NavDropdown.Item>

                  </NavDropdown>

                  <NavDropdown title="Usuario" id="usuario">

                    <NavDropdown.Item>
                      <Link to="/Usuario" className="link-unstyled">Registrar Usuario</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/Gestionusuario" className="link-unstyled">Usuarios</Link>
                    </NavDropdown.Item>

                  </NavDropdown>

                  <NavDropdown title="Comentarios" id="comentario">

                    <NavDropdown.Item>
                      <Link to="/Gestioncomentario" className="link-unstyled">Comentarios</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Detalle" id="detalle">

                    <NavDropdown.Item>
                      <Link to="/Detallecompra" className="link-unstyled">Detalle Compra</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/GestionDetallecompra" className="link-unstyled">Compras</Link>
                    </NavDropdown.Item>

                  </NavDropdown>


                  <NavDropdown title="Estadisticas" id="estadistica">

                    <NavDropdown.Item>
                      <Link to="/Estadistica" className="link-unstyled">Estadisticas</Link>
                    </NavDropdown.Item>

                  </NavDropdown>


                  <Nav.Link>
                    <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                  </Nav.Link>




                </Nav>
              </Navbar.Collapse>
              <Button
                variant="outline-light"
                onClick={toggleMenu}
                className="d-md-none d-block"
                aria-controls="basic-navbar-nav"
                aria-expanded={showMenu ? 'true' : 'false'}
              >
                Menú
              </Button>
            </Container>
          </Navbar>

          {/* Menú lateral (Offcanvas) */}
          <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link>
                  <Link to="/about" className="link-unstyled">Informacion</Link>
                </Nav.Link>

                <NavDropdown title="Producto" id="producto">
                  <NavDropdown.Item>
                    <Link to="/Producto" className="link-unstyled">Registrar Producto </Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/Categoria" className="link-unstyled">Registrar Categoría</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/Marca" className="link-unstyled">Registrar Marca</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <Link to="/Gestionproducto" className="link-unstyled">Productos</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/Gestioncategoria" className="link-unstyled">Categorias</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/Gestionmarca" className="link-unstyled">Marcas</Link>
                  </NavDropdown.Item>

                </NavDropdown>

                <NavDropdown title="Usuario" id="usuario">

                  <NavDropdown.Item>
                    <Link to="/Usuario" className="link-unstyled">Registrar Usuario</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <Link to="/Gestionusuario" className="link-unstyled">Usuarios</Link>
                  </NavDropdown.Item>

                </NavDropdown>

                <NavDropdown title="Comentarios" id="comentario">

                  <NavDropdown.Item>
                    <Link to="/Gestioncomentario" className="link-unstyled">Comentarios</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Detalle" id="detalle">

                  <NavDropdown.Item>
                    <Link to="/Detallecompra" className="link-unstyled">Detalle Compra</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <Link to="/GestionDetallecompra" className="link-unstyled">Compras</Link>
                  </NavDropdown.Item>

                </NavDropdown>


                <NavDropdown title="Estadisticas" id="estadistica">

                  <NavDropdown.Item>
                    <Link to="/Estadistica" className="link-unstyled">Estadisticas</Link>
                  </NavDropdown.Item>

                </NavDropdown>

                <Nav.Link>
                    <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                  </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>)}

      {rol === 'cliente' && (
        <div>
          <Navbar className="navbar-color" variant="dark" expand="md" fixed='top'>
            <Container>
              <Link to="/home" className="navbar-brand">
                <img src={logo} alt="Logo de Variedades Duarte" className="logo-img" />
              </Link>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ display: 'none' }}
                className="d-sm-none d-xs-none"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">

                  <Nav.Link>
                    <Link to="/about" className="link-unstyled">Informacion</Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <Button
                variant="outline-light"
                onClick={toggleMenu}
                className="d-md-none d-block"
                aria-controls="basic-navbar-nav"
                aria-expanded={showMenu ? 'true' : 'false'}
              >
                Menú
              </Button>
            </Container>
          </Navbar>
          {/* Menú lateral (Offcanvas) */}
          <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link>
                  <Link to="/about" className="link-unstyled">Informacion</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                  </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>)}
    </div>
  );
}

export default Header;