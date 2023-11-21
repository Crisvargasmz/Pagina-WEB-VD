import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Col, Container, FloatingLabel, Card, Button, Alert, Modal } from 'react-bootstrap';
import Header from '../components/Header';
import { FaSearch, FaTrashAlt, FaPlus } from 'react-icons/fa';

function Detallecompra({ rol }) {
  const [productos, setProductos] = useState([]);
  const [estado, setEstado] = useState('');
  const [fecha_Estimada, setFechaEstimada] = useState('');
  const [cantidad_Compra, setCantidadCompra] = useState('');
  const [precio_Compra, setPrecioCompra] = useState('');
  const [id_Producto, setIdProducto] = useState('');

  const [formData, setFormData] = useState({
    cantidad_Compra: '',
    precio_Compra: '',
    id_Producto: '',
    total_Compra: '',
    id_Compra: '',
  });

  function formatearNumeroConComas(numero) {
    // Aplica toFixed para limitar los decimales a dos
    const numeroFormateado = Number(numero).toFixed(2);
    
    // Usa una expresión regular para agregar comas
    return numeroFormateado.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [selectedProducto, setSelectedProducto] = useState(null);
  const [detallesVenta, setDetallesVenta] = useState([]);

  const loadProductos = () => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

  const openProductoModal = () => {
    setShowProductoModal(true);
  };

  const closeProductoModal = () => {
    setShowProductoModal(false);
  };

  const selectProducto = (producto) => {
    setSelectedProducto(producto);
    setFormData({
      ...formData,
      id_Producto: producto.id_Producto,
    });
    closeProductoModal();
  };

  const [showProductoModal, setShowProductoModal] = useState(false);

  const getCurrentTime = () => {
    const now = new Date();
    const fecha_compra = now.toISOString().split('T')[0];
    const hora_compra = now.toTimeString().split(' ')[0];
    return { fecha_compra, hora_compra };
  };

  useEffect(() => {
    loadProductos();
  }, []);

  const AgregarDetalleProducto = () => {
    if (selectedProducto && cantidad_Compra) {
      const nuevoDetalle = {
        id_Producto: selectedProducto.id_Producto,
        nombre_Producto: selectedProducto.nombre_Producto,
        precio: selectedProducto.precio,
        cantidad_Compra: cantidad_Compra,
      };
      setDetallesVenta([...detallesVenta, nuevoDetalle]);
      setCantidadCompra('');
      setSelectedProducto(null); // Cambiado de '' a null
    } else {
      alert('Asegúrese de seleccionar un producto o ingresar una cantidad.');
    }
  };

  const EliminarDetalle = (id_Producto) => {
    const detallesActualizados = detallesVenta.filter((detalle) => detalle.id_Producto !== id_Producto);
    setDetallesVenta(detallesActualizados);
  };

  const registrarVenta = () => {
    const { fecha_compra, hora_compra } = getCurrentTime(); // Obtener fecha y hora actuales
    if (estado && fecha_Estimada && detallesVenta.length > 0) {
      const data = {
        fecha_compra: fecha_compra,
        hora_compra: hora_compra,
        estado: estado,
        fecha_Estimada: fecha_Estimada,
        detalle: detallesVenta,
      };
      fetch('http://localhost:5000/crud/createcompras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message) {
            console.log('Venta registrada con éxito');
            alert('¡Venta registrada con éxito!');
            setDetallesVenta([]);
            setFechaEstimada('');
            setEstado('');
            setPrecioCompra('');
            setCantidadCompra('');
            setIdProducto('');
          } else {
            console.error('Error al registrar la venta');
          }
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
        });
    } else {
      alert('Asegúrese de completar la información necesaria para registrar la venta.');
    }
  };


  const handleNEstadoChange = (e) => {
    // Validar que solo se ingresen letras
    const nuevoNombre = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo permite letras y espacios
    setEstado(nuevoNombre);
  };

  const handleCantidadChange = (e) => {
    // Validar que solo se ingresen números no negativos
    const nuevaCantidad = e.target.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
    setCantidadCompra(nuevaCantidad);
  };



  return (
    <div>
      <Header rol={rol} />

      <Container>
        <Card className="global-margin-top-compra">
          <Card.Body>
            <Card.Title className="mb-3 title">Detalle de Compra</Card.Title>

            <Form className="mt-3">
              <Row className="g-3">
                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="estado" label="Estado">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el estado"
                      value={estado}
                      onChange={handleNEstadoChange}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="fecha_estimada" label="Fecha Estimada">
                    <Form.Control
                      type="date"
                      value={fecha_Estimada}
                      onChange={(e) => setFechaEstimada(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="12" md="4" lg="4">
                  <FloatingLabel controlId="producto" label="Producto">
                    <Form.Control
                      className='input-align'
                      type="text"
                      placeholder="Seleccionar Producto"
                      name="producto"
                      value={selectedProducto ? selectedProducto.nombre_Producto : ''}
                      readOnly
                    />
                    <div className="button-container">
                      <Button className="show-button-search" variant="outline-primary" onClick={openProductoModal}>
                        <FaSearch />
                      </Button>
                    </div>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="4" lg="4">
                  <FloatingLabel controlId="cantidad_Compra" label="Cantidad del producto seleccionado">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la cantidad de compra"
                      value={cantidad_Compra}
                      onChange={handleCantidadChange}
                    />
                  </FloatingLabel>
                </Col>


                <Col sm="12" md="2" lg="2" className="">
                  <Button className='show-button-add' onClick={AgregarDetalleProducto} variant="outline-success" size="lg">
                    <FaPlus />
                  </Button>
                </Col>

                <Col sm="12" md="1" lg="12" className='container-top'>
                  <Card className="global-margin-top-compra">
                    <Card.Body>
                      <Card.Title className="mt-3 title">Detalle de productos</Card.Title>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detallesVenta.map((detalle) => (
                            <tr key={detalle.idProducto}>
                              <td>{detalle.id_Producto}</td>
                              <td>{detalle.nombre_Producto}</td>
                              <td>C${formatearNumeroConComas(detalle.precio)}</td>
                              <td>{detalle.cantidad_Compra}</td>
                              <td>C${formatearNumeroConComas(detalle.cantidad_Compra * detalle.precio)}</td>
                              <td className="align-button">
                                <Button
                                  size="sm"
                                  onClick={() => EliminarDetalle(detalle.id_Producto)}
                                  variant="danger"
                                >
                                  <FaTrashAlt />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="center-button">
                <Button variant="primary" onClick={registrarVenta} className="mt-3 button-color" size="lg">
                  Registrar Compra
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showProductoModal} onHide={closeProductoModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productos.map((producto) => (
            <div className="Seleccion" key={producto.id_Producto} onClick={() => selectProducto(producto)}>
              {producto.nombre_Producto}
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Detallecompra;
