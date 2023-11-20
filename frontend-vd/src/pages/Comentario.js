import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

function Comentario({rol}) {
  const [calificacion, setCalificacion] = useState(0);
  const [contenido_Comentario, setContenido_Comentario] = useState('');
  const [id_Usuario, setId_Usuario] = useState('');
  const [id_Producto, setId_Producto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    function getCurrentDateFormatted() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    // Usar la función para obtener la fecha formateada
    const currentDate = getCurrentDateFormatted();
    

    // Crear un objeto con los datos del formulario
    const formData = {
      calificacion,
      fecha_Comentario: currentDate,
      contenido_Comentario,
      id_Usuario,
      id_Producto,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createcomentarios', {
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
        setCalificacion(0);
        setContenido_Comentario('');
        setId_Usuario('');
        setId_Producto('');
      } else {
        alert('Error al registrar comentario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return (
    <div>
      <Header rol={rol}/>

      <Container>
        <Card className="global-margin-top">
          <Card.Body>
            <Card.Title className="mb-3 title ">Registro de Comentario</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="calificacion" label="">
                    <StarRating rating={calificacion} onRatingChange={setCalificacion} />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="contenido_Comentario" label="Comentario">
                    <Form.Control
                      as="textarea"
                      className="auto-expand-textarea" // Aplica la clase personalizada aquí
                      placeholder="Ingrese el comentario"
                      value={contenido_Comentario}
                      onChange={(e) => {
                        setContenido_Comentario(e.target.value);
                        e.target.style.height = 'auto'; // Restablece la altura a 'auto' para calcular la nueva altura
                        e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta la altura automáticamente
                      }}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_Usuario" label="Usuario">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el usuario"
                      value={id_Usuario}
                      onChange={(e) => setId_Usuario(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_Producto" label="Producto">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el producto"
                      value={id_Producto}
                      onChange={(e) => setId_Producto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3 button-color" size="lg">
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
        <div className="star-rating-title">Calificación</div>
        <div className="star-rating">{stars}</div>
      </div>
    );
  }
  

export default Comentario;
