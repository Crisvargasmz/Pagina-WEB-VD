import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';

function Gestioncategoria() {
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedcategoria, setSelectedCategoria] = useState({});
  const [formData, setFormData] = useState({
    nombre_Categoria: '',
  });
  const [warningMessage, setWarningMessage] = useState('');
// Función para abrir el modal y pasar los datos del producto seleccionado
  const openModal = (categoria) => {
    setSelectedCategoria(categoria);

    setFormData({
      nombre_Categoria: categoria.nombre_Categoria,

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

  const loadCategorias = () => {
    fetch('http://localhost:5000/crud/readcategoria')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener las categorias:', error));
  };
  useEffect(() => {
    loadCategorias();
  }, []);

  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updatecategoria/${selectedcategoria.id_Categoria}`, {
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
          loadCategorias(); // Cargar la lista de productos actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar una categoría
  const handleDelete = (id_Categoria) => {
    const categoria = categorias.find((categoria) => categoria.id_Categoria === id_Categoria);

    if (categoria) {
      const confirmation = window.confirm('¿Seguro que deseas eliminar esta categoría?');
      if (confirmation) {
        // Realiza la solicitud DELETE al servidor para eliminar la categoría
        fetch(`http://localhost:5000/crud/deletecategoria/${id_Categoria}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              // La eliminación fue exitosa, refresca la lista de categorías
              loadCategorias();
            } else {
              // La eliminación no fue exitosa, verificar si es debido a una restricción o constraint
              return response.json();
            }
          })
          .then((data) => {
            if (data && data.error) {
              // Mostrar un mensaje de error en caso de restricción
              setWarningMessage('No se puede eliminar esta categoría porque está vinculada a un producto.');
              // Limpia el mensaje después de dos segundos
              setTimeout(() => {
                setWarningMessage('');
              }, 2000); // 2000 milisegundos = 2 segundos
            }
          })
          .catch((error) => console.error('Error al eliminar la categoría:', error));
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
          <Card.Title className="mb-3">Listado de Categorias</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.id_Categoria}>
                  <td>{categoria.id_Categoria}</td>
                  <td>{categoria.nombre_Categoria}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(categoria)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(categoria.id_Categoria)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Categoria</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="nombre_Categoria" label="Nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre"
                        name="nombre_Categoria"
                        value={formData.nombre_Categoria}
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

export default Gestioncategoria;
