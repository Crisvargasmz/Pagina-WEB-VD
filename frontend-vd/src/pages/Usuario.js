import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Usuario() {
  const [nombre_Usuario, setNombre_Usuario] = useState('');
  const [correo_Electronico, setCorreo_Electronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol,setRol] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nombre_Usuario,
      correo_Electronico,
      contrasena,
      rol,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createusuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registro exitoso');
        setNombre_Usuario('');
        setCorreo_Electronico('');
        setContrasena('');
        setRol('');
      } else {
        alert('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return (
    <div>
      <Header />

      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Usuario</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre_Usuario" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre_Usuario}
                      onChange={(e) => setNombre_Usuario(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="contrasena" label="Contraseña">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ingrese una la contraseña"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                    />
                    <Button
                      variant="outline-secondary"
                      className="show-password-button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </Button>
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="correo_Electronico" label="Correo">
                    <Form.Control
                      type="email"
                      placeholder="Ingrese el Correo"
                      value={correo_Electronico}
                      onChange={(e) => setCorreo_Electronico(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="rol" label="Rol">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el rol"
                      value={rol}
                      onChange={(e) => setRol(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
          
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
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

export default Usuario;
