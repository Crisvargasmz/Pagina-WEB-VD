import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Marca({rol}) {

  // Crear un estado para cada campo del formulario
  const [nombre_Marca, setNombre_Marca] = useState('');

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



  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre_Marca) {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre_Marca,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createmarca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
       notifySuccess('Registro exitoso');
        // Reiniciar los campos del formulario
        setNombre_Marca('');
      } else {
        notifyError('Error al registrar la marca');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  const handleNombreMarcaChange = (e) => {
    // Validar que solo se ingresen letras
    const nuevoNombre = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo permite letras y espacios
    setNombre_Marca(nuevoNombre);
  };


  return(
    <div>
      
  <ToastContainer/>
      <Header rol={rol}/>
      
      <Container>
        <Card className="global-margin-top" >
          <Card.Body>
            <Card.Title className="mb-3 title ">Registro de Marca</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="nombre_Marca" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre_Marca}
                      onChange={handleNombreMarcaChange}
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

export default Marca;