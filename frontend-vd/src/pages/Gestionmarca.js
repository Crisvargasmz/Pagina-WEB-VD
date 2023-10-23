import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';

function Gestionmarca() {
  const [marcas, setMarcas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedmarca, setSelectedmarca] = useState({});
  const [formData, setFormData] = useState({
    nombre_Categoria: '',
  });
  const [warningMessage, setWarningMessage] = useState('');
// Función para abrir el modal y pasar los datos del producto seleccionado
  const openModal = (marca) => {
    setSelectedmarca(marca);

    setFormData({
      nombre_Marca: marca.nombre_Marca,

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

  const loadMarca = () => {
    fetch('http://localhost:5000/crud/readmarcas')
      .then((response) => response.json())
      .then((data) => setMarcas(data))
      .catch((error) => console.error('Error al obtener las Marca:', error));
  };
  useEffect(() => {
    loadMarca();
  }, []);

  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updatemarca/${selectedmarca.id_Marca}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de productos
          setShowModal(false);
          loadMarca(); // Cargar la lista de productos actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar una categoría
  const handleDelete = (id_Marca) => {
    const categoria = marcas.find((marca) => marca.id_Marca === id_Marca);

    if (categoria) {
      const confirmation = window.confirm('¿Seguro que deseas eliminar esta Marca?');
      if (confirmation) {
        // Realiza la solicitud DELETE al servidor para eliminar la categoría
        fetch(`http://localhost:5000/crud/deletemarcas/${id_Marca}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              // La eliminación fue exitosa, refresca la lista de categorías
              loadMarca();
            } else {
              // La eliminación no fue exitosa, verificar si es debido a una restricción o constraint
              return response.json();
            }
          })
          .then((data) => {
            if (data && data.error) {
              // Mostrar un mensaje de error en caso de restricción
              setWarningMessage('No se puede eliminar esta marca porque está vinculada a un producto.');
              // Limpia el mensaje después de dos segundos
              setTimeout(() => {
                setWarningMessage('');
              }, 2000); // 2000 milisegundos = 2 segundos
            }
          })
          .catch((error) => console.error('Error al eliminar la categoria:', error));
      }
    }
  };

  return (
    <div>
      <Header />

        {/* Agregar un mensaje de advertencia si existe uno */}
        {warningMessage && (
        <Alert variant="warning" onClose={() => setWarningMessage('')} dismissible>
          {warningMessage}
        </Alert>
      )}

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Marcas</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {marcas.map((marca) => (
                <tr key={marca.id_Marca}>
                  <td>{marca.id_Marca}</td>
                  <td>{marca.nombre_Marca}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(marca)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(marca.id_Marca)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Marca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Marca</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="nombre_Marca" label="Nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre"
                        name="nombre_Marca"
                        value={formData.nombre_Marca}
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

export default Gestionmarca;