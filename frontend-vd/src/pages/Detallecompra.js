import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Col, Container, FloatingLabel, Card, Button, Alert, Modal } from 'react-bootstrap';
import Header from '../components/Header';
import { FaSearch, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const notifySuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 800, // Auto cerrar después de 3 segundos
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 800,
    });
  };


  const [formErrors, setFormErrors] = useState({
    estado: '',
    presentacion: '',
    descripcion: '',
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
    setSearchQueryProducto('');
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
    const errors = {};
  
    if (!selectedProducto) {
      errors.selectedProducto = 'Seleccione un producto';
    }
  
    if (!cantidad_Compra.trim()) {
      errors.cantidad_Compra = 'Ingrese una cantidad';
    }
  
    setFormErrors(errors);
  
    if (Object.values(errors).some((error) => error !== '')) {
      // Puedes agregar más lógica aquí según tus necesidades
      return;
    }
  
    if (selectedProducto && cantidad_Compra) {
      const nuevoDetalle = {
        id_Producto: selectedProducto.id_Producto,
        nombre_Producto: selectedProducto.nombre_Producto,
        precio: selectedProducto.precio,
        cantidad_Compra: cantidad_Compra,
      };
      setDetallesVenta([...detallesVenta, nuevoDetalle]);
      setCantidadCompra('');
      setSelectedProducto(null);
    }
  };

  const EliminarDetalle = (id_Producto) => {
    const detallesActualizados = detallesVenta.filter((detalle) => detalle.id_Producto !== id_Producto);
    setDetallesVenta(detallesActualizados);
  };

  const registrarVenta = () => {

 // Validar campos vacíos
 const errors = {};



if (!fecha_Estimada) {

  errors.fecha_Estimada = 'Ingresa la fecha estimada del pedido'
}

if (!estado) {
  errors.estado = 'Ingresa el estado del pedido';
}
 // Actualizar el estado de los errores
 setFormErrors(errors);

 // Si hay errores, detener el envío del formulario
 if (Object.values(errors).some((error) => error !== '')) {
   return;
 }


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
            notifySuccess('¡Venta registrada con éxito!');
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
     
    }
  };


  const handleNEstadoChange = (e) => {
    const nuevoNombre = e.target.value.replace(/[^a-zA-Z ]/g, '');
    if (!nuevoNombre.trim()) {
      setFormErrors({ ...formErrors, estado: 'Ingrese un estado válido' });
    } else {
      setFormErrors({ ...formErrors, estado: '' });
      setEstado(nuevoNombre);
    }
  };
  
  const handleCantidadChange = (e) => {
    const nuevaCantidad = e.target.value;
  
    // Verificar si el evento es un retroceso (backspace)
    if (e.nativeEvent.inputType === 'deleteContentBackward' && nuevaCantidad.length === 0) {
      setCantidadCompra('');
    } else {
      // Validar que solo se ingresen números no negativos
      const nuevoValor = nuevaCantidad.replace(/[^0-9]/g, '');
      setCantidadCompra(nuevoValor);
    }
  };


  const [searchQueryProducto, setSearchQueryProducto] = useState('');

  const handleSearchChangeProducto = (e) => {
    setSearchQueryProducto(e.target.value);
  };

  const filteredProductos = productos.filter((producto) => {
    const nombre_Producto = producto.nombre_Producto.toLowerCase();
    const search = searchQueryProducto.toLowerCase();
    return nombre_Producto.includes(search);
  });



  return (
    <div>
      <ToastContainer/>
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
                  {formErrors.estado && (
  <div className="error-message">{formErrors.estado}</div>
)}
                </Col>
                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="fecha_estimada" label="Fecha Estimada">
                    <Form.Control
                      type="date"
                      value={fecha_Estimada}
                      onChange={(e) => setFechaEstimada(e.target.value)}
                    />
                  </FloatingLabel>
                  {formErrors.fecha_Estimada && (
  <div className="error-message">{formErrors.fecha_Estimada}</div>
)}
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
                      <Button className="show-button-search" variant="primary" onClick={openProductoModal}>
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
                       <div className="button-container">
                  <Button className='show-button-add' variant="primary" onClick={AgregarDetalleProducto}  size="lg">
                    <FaPlus />
                  </Button>
                  </div>
                  </FloatingLabel>
 
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
        <Row className="mt-3">
          <Col className='search-input'>
            <FloatingLabel controlId="search" label="Buscar">
              <Form.Control
                type="text"
                placeholder="Buscar"
                value={searchQueryProducto}
                onChange={handleSearchChangeProducto}
                onKeyDown={(e) => {
                  // Permitir solo letras, números y espacios
                  if (!((e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z') || (e.key >= '0' && e.key <= '9') || e.key === ' ')) {
                    e.preventDefault();
                  }
                }}  
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Modal.Body>
          {filteredProductos.map((producto) => (
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
