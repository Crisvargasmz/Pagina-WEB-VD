import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';

function Gestionproducto() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedproducto, setSelectedProducto] = useState({});
  const [formData, setFormData] = useState({
    nombre_Producto: '',
    presentacion: '',
    imagen: '',
    descripcion: '',
    precio: '',
    cantidad: '',
    id_Marca: '',
    id_Categoria: '',
  });

  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (producto) => {
    setSelectedProducto(producto);

    setFormData({
      nombre_Producto: producto.nombre_Producto,
      presentacion: producto.presentacion,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: producto.cantidad,
      id_Marca: producto.id_Marca,
      id_Categoria: producto.id_Categoria,
    });
    setShowModal(true);
  };

// Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadProducto = () => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateproducto/${selectedproducto.id_Producto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de docentes
          setShowModal(false);
          loadProducto(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (id_Producto) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este producto?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deleteproducto/${id_Producto}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadProducto();
          }
        })
        .catch((error) => console.error('Error al eliminar el producto:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Productos</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Presentación</th>
                <th>Imagen</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Marca</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id_Producto}>
                  <td>{producto.id_Producto}</td>
                  <td>{producto.nombre_Producto}</td>
                  <td>{producto.presentacion}</td>
                  <td>{producto.imagen}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.id_Marca}</td>
                  <td>{producto.id_Categoria}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(producto)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(producto.id_Producto)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de producto</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombre_Producto" label="Nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre"
                        name="nombre_Producto"
                        value={formData.nombre_Producto}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="presentacion" label="Presentación">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la presentacion"
                        name="presentacion"
                        value={formData.presentacion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="imagen" label="Imagen">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese la imagen"
                        name="imagen"
                        value={formData.imagen}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                 

                  <Col sm="12" md="6" lg="8">
                    <FloatingLabel controlId="descripcion" label="Descripción">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese la descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="precio" label="Precio">
                      <Form.Control 
                        type="number" 
                        placeholder="Ingrese el precio"
                        name="precio"
                        value={formData.precio}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="cantidad" label="Cantidad">
                      <Form.Control 
                        type="number" 
                        placeholder="Ingrese la cantidad"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>  

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="id_Marca" label="Marca">
                      <Form.Control 
                        type="id_Marca" 
                        placeholder="Ingrese la marca"
                        name="id_Marca"
                        value={formData.id_Marca}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>  


                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="id_Categoria" label="Categoria">
                      <Form.Control 
                        type="number" 
                        placeholder="Ingrese la categoria"
                        name="id_Categoria"
                        value={formData.id_Categoria}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>  

          
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Gestionproducto;
