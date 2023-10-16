import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Producto() {

  // Crear un estado para cada campo del formulario
  const [nombre_Producto, setNombre_Producto] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [id_Marca, setId_Marca] = useState('');
  const [id_Categoria, setId_Categoria] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre_Producto,
      presentacion,
      imagen,
      descripcion,
      precio,
      cantidad,
      id_Marca,
      id_Categoria,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createproducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        // Reiniciar los campos del formulario
        setNombre_Producto('');
        setPresentacion('');
        setImagen('');
        setDescripcion('');
        setPrecio('');
        setCantidad('');
        setId_Marca('');
        setId_Categoria('');
      } else {
        alert('Error al registrar producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return(
    <div>
      <Header />
      
      <Container>
        <Card className="mt-3" >
          <Card.Body>
            <Card.Title>Registro de Producto</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre_Producto" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre_Producto}
                      onChange={(e) => setNombre_Producto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="presentacion" label="Presentación">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la presentacion"
                      value={presentacion}
                      onChange={(e) => setPresentacion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="imagen" label="Imagen">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese una imagen"
                      value={imagen}
                      onChange={(e) => setImagen(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="descripcion" label="Descripción">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese la dirección"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="precio" label="Precio">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese el precio" 
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="cantidad" label="Cantidad">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese la cantidad" 
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_Marca" label="Marca">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese la marca" 
                      value={id_Marca}
                      onChange={(e) => setId_Marca(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_Categoria" label="Categoria">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese la categoria" 
                      value={id_Categoria}
                      onChange={(e) => setId_Categoria(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3 product-button" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

    </div>
  );
}

export default Producto;