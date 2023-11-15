import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Card, Badge, Form, FloatingLabel, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import { FaComments } from 'react-icons/fa6';


function Catalogo({ rol }) {
  const [productos, setProductos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducto = productos.filter((producto) => {
    const nombre_Producto = producto.nombre_Producto.toLowerCase();
    const presentacion = producto.presentacion.toLowerCase();
    const descripcion = producto.descripcion.toLowerCase();
    const marca = marcas.find((marca) => marca.id_Marca === producto.id_Marca)?.nombre_Marca.toLowerCase();
    const categoria = categorias.find((categoria) => categoria.id_Categoria === producto.id_Categoria)?.nombre_Categoria.toLowerCase();
    const search = searchQuery.toLowerCase();

    return (
      nombre_Producto.includes(search) ||
      presentacion.includes(search) ||
      descripcion.includes(search) ||
      marca.includes(search) ||
      categoria.includes(search)
    );
  });

  useEffect(() => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  const loadMarcas = () => {
    fetch('http://localhost:5000/crud/nombremarcas')
      .then((response) => response.json())
      .then((data) => setMarcas(data))
      .catch((error) => console.error('Error al obtener las marcas:', error));
  };

  const loadCategorias = () => {
    fetch('http://localhost:5000/crud/nombrecategorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener las categorías:', error));
  };

  useEffect(() => {
    loadMarcas();
    loadCategorias();
  }, []);

  return (
    <div>
      <Header rol={rol} />

      <Container className="margen-contenedor">

        <Row className="global-margin-top">
          <Col sm="6" md="6" lg="4">
            <FloatingLabel className="search-styles" controlId="search" label="Buscar">
              <Form.Control
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="card-styles">
          {filteredProducto.map((producto) => (
            <Col sm="12" md="4" lg="3" key={producto.id_Producto}>
              <Card className="product-card">
                <Card.Img className="image-card" variant="top" src={producto.imagen} alt={producto.nombre_Producto} />
                <Card.Body>
                  <Card.Title className="title-nombre">{producto.nombre_Producto}</Card.Title>
                  <Card.Text className="product-description">
                    {producto.descripcion}
                  </Card.Text>
                  <div>
                    
                    <div className="product-price">C$ {producto.precio.toFixed(2)}</div>
                    <Badge bg="warning" text="dark">
                      {/* Puedes agregar contenido a esta insignia si es necesario */}
                    </Badge>
                  </div>
                </Card.Body>
                <Button>
                <FaComments />
                </Button>
                <Card.Body>
                <Card.Link href="/producto" className="btn btn-primary">
                      Agregar
                    </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    
  );
}
export default Catalogo;
