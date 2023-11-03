import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { FaSistrix, FaPencil, FaTrashCan} from 'react-icons/fa6';

function Gestioncomentario({rol}) {
  const [comentarios, setComentarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedcomentario, setSelectedComentario] = useState({});
  const [formData, setFormData] = useState({
    calificacion: 0,
    contenido_Comentario: '',
    fecha_Comentario:'',
  });

 

  // Función para abrir el modal y pasar los datos del comentario seleccionado
  const openModal = (comentario) => {
    setSelectedComentario(comentario);

    const formattedFechaComentario = formatDateForInput(comentario.fecha_Comentario);

    setFormData({
      calificacion: comentario.calificacion,
      contenido_Comentario: comentario.contenido_Comentario,
      fecha_Comentario: formattedFechaComentario,
    });
    setShowModal(true);
  };

  function formatDateForInput(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar ceros iniciales
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadComentario = () => {
    fetch('http://localhost:5000/crud/readcomentarios')
      .then((response) => response.json())
      .then((data) => setComentarios(data))
      .catch((error) => console.error('Error al obtener los comentarios:', error));
  };

  // Realiza una solicitud GET al servidor para obtener los comentarios
  useEffect(() => {
    loadComentario();
  }, []);

  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updatecomentarios/${selectedcomentario.id_Comentario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de comentarios
          setShowModal(false);
          loadComentario(); // Cargar la lista de comentarios actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un comentario
  const handleDelete = (id_Comentario) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este comentario?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el comentario
      fetch(`http://localhost:5000/crud/deletecomentarios/${id_Comentario}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de comentarios
            loadComentario();
          }
        })
        .catch((error) => console.error('Error al eliminar el comentario:', error));
    }
  };

  return (
    <div>
      <Header rol={rol}/>

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3 title ">Listado de comentarios</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Calificacion</th>
                <th>Fecha</th>
                <th>Comentario</th>
                <th>Usuario</th>
                <th>Producto</th>
              </tr>
            </thead>
            <tbody>
              {comentarios.map((comentario) => (
                <tr key={comentario.id_Comentario}>
                  <td>{comentario.id_Comentario}</td>
                  <td>{comentario.calificacion}</td>
                  <td>{formatDateForInput(comentario.fecha_Comentario)}</td>
                  <td>{comentario.contenido_Comentario}</td>
                  <td>{comentario.id_Usuario}</td>                 
                  <td>{comentario.id_Producto}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(comentario)}><FaPencil/></Button>
                    <Button variant="danger" onClick={() => handleDelete(comentario.id_Comentario)}><FaTrashCan/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Comentario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Comentario</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="calificacion" label="Calificación">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese la calificación"
                        name="calificacion"
                        value={formData.calificacion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="contenido_Comentario" label="Comentario">
                      <Form.Control
                        as="textarea"
                        placeholder="Ingrese el comentario"
                        name="contenido_Comentario"
                        value={formData.contenido_Comentario}
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

function StarRating({ rating, onRatingChange }) {
  const maxRating = 5;
  const starSize = 30; // Tamaño deseado de las estrellas en píxeles
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    const isSolid = i <= rating;

    const starStyle = {
      fontSize: `${starSize}px`,
      cursor: 'pointer',
    };

    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={isSolid ? solidStar : regularStar}
        onClick={() => onRatingChange(i)}
        style={starStyle}
      />
    );
  }

  return (
    <div className="star-rating-container">
      <div className="star-rating">{stars}</div>
    </div>
  );
}

export default Gestioncomentario;
