import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Detallecompra({ rol }) {
  const [estado, setEstado] = useState('');
  const [fecha_estimada, setFechaEstimada] = useState('');
  const [cantidad_Compra, setCantidadCompra] = useState('');
  const [precio_Compra, setPrecioCompra] = useState('');
  const [id_Producto, setIdProducto] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error
  const [warningMessage, setWarningMessage] = useState(''); // Mensaje de advertencia
  const [stockDisponible, setStockDisponible] = useState(null); // Cantidad de stock disponible

  // Función para obtener la fecha y hora actuales
  const getCurrentDateTime = () => {
    const now = new Date();
    const fecha_compra = now.toISOString().split('T')[0];
    const hora_compra = now.toTimeString().split(' ')[0];
    return { fecha_compra, hora_compra };
  };

  // Función para obtener la cantidad de stock disponible
  const getStockDisponible = async () => {
    try {
      const response = await fetch(`http://localhost:5000/crud/stock/${id_Producto}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setStockDisponible(data.stock); // Establece la cantidad de stock en el estado
      }
    } catch (error) {
      console.error('Error al obtener el stock:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fecha_compra, hora_compra } = getCurrentDateTime();
    const formData = {
      fecha_compra,
      hora_compra,
      estado,
      fecha_estimada,
      cantidad_Compra,
      precio_Compra,
      id_Producto,
    };

    try {
      // Obtener la cantidad de stock disponible
      await getStockDisponible();

      if (stockDisponible !== null) {
        if (parseInt(cantidad_Compra) > stockDisponible) {
          setWarningMessage(`No hay suficiente stock. Unidades disponibles: ${stockDisponible}`);
          setTimeout(() => {
            setWarningMessage('');
          }, 2000);
          
          return; // No continúa con el proceso de compra
        }
      }

      const response = await fetch('http://localhost:5000/crud/createcompras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Compra y detalle registrados con éxito');
        setEstado('');
        setFechaEstimada('');
        setCantidadCompra('');
        setPrecioCompra('');
        setIdProducto('');
      } else {
        const data = await response.json();
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setErrorMessage('Error en la solicitud al servidor');
    }
  };

  return (
    <div>
      <Header rol={rol} />

      <Container>
        <Card className="global-margin-top">
          <Card.Body>
            <Card.Title className="mb-3 title">Detalle de Compra</Card.Title>

            {warningMessage && (
        <Alert variant="warning" onClose={() => setWarningMessage('')} dismissible>
          {warningMessage}
        </Alert>
      )}

            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="estado" label="Estado">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el estado"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="fecha_estimada" label="Fecha Estimada">
                    <Form.Control
                      type="date"
                      value={fecha_estimada}
                      onChange={(e) => setFechaEstimada(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="cantidad_Compra" label="Cantidad de Compra">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese la cantidad de compra"
                      value={cantidad_Compra}
                      onChange={(e) => setCantidadCompra(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="precio_Compra" label="Precio de Compra">
                    <Form.Control
                      type="number"
                      step="0.01"
                      placeholder="Ingrese el precio de compra"
                      value={precio_Compra}
                      onChange={(e) => setPrecioCompra(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="id_Producto" label="ID del Producto">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el ID del producto"
                      value={id_Producto}
                      onChange={(e) => setIdProducto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar Compra y Detalle
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

  
    </div>
  );
}

export default Detallecompra;
