  import React, { useState } from 'react';
  import { Form, Button, Card, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
  import { Link, useNavigate } from 'react-router-dom';
  import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  const Login = ({ setRol, setId_Usuario }) => {
    const navigate = useNavigate();

    const [nombre_Usuario, setNombre_Usuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [formErrors, setFormErrors] = useState({
      nombre_Usuario: '',
      contrasena: '',
   
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

    const handleSubmit = async (event) => {
      event.preventDefault();

           // Validar campos vacíos
     const errors = {};

     if (!nombre_Usuario) {
       errors.nombre_Usuario = 'Ingrese su usuario';
     }

     if (!contrasena) {

      errors.contrasena = 'Ingresa la contraseña';
     }
 
 
     // Actualizar el estado de los errores
     setFormErrors(errors);
 
     // Si hay errores, detener el envío del formulario
     if (Object.values(errors).some((error) => error !== '')) {
       return;
     }

      // Objeto con los datos del formulario
      const formData = {
        nombre_Usuario,
        contrasena,
      };

      try {
        const response = await fetch('http://localhost:5000/crud/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const { id_Usuario, rol } = await response.json();
          console.log('id_Usuario:', id_Usuario);
          console.log('Rol', rol);

          // Actualiza el estado del id_Usuario y el rol solo si las credenciales son correctas
          setRol(rol);
          setId_Usuario(id_Usuario);
          navigate('/home');
        } else {
          console.log('Credenciales incorrectas');
          notifyError('¡Credenciales incorrectas!');
        }
      } catch (error) {
        console.error('Error en la solicitud: ', error);
      }
    };

    return (
      
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <ToastContainer/>
        <Row className="justify-content-md-center">
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title className="mb-3">Inicio de Sesión</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm="12" md="12" lg="12" className="mb-3">
                      <FloatingLabel controlId="nombre_Usuario" label="Ingrese su usuario">
                        <Form.Control
                          placeholder="Ingrese su usuario"
                          type="text"
                          value={nombre_Usuario}
                          onChange={(e) => setNombre_Usuario(e.target.value)}
                        />
                      </FloatingLabel>
                      {formErrors.nombre_Usuario && <div className="error-message">{formErrors.nombre_Usuario}</div>}
                    </Col>
                    <Col sm="12" md="12" lg="12">
                      <FloatingLabel controlId="contrasena" label="Ingrese su contraseña">
                        <Form.Control
                          placeholder="Ingrese su contraseña"
                          type="password"
                          value={contrasena}
                          onChange={(e) => setContrasena(e.target.value)}
                        />
                      </FloatingLabel>
                      {formErrors.contrasena && <div className="error-message">{formErrors.contrasena}</div>}
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center mb-3 buttom-space1">
                    <Button variant="primary" type="submit" className="mr-2 buttom-right button-color">
                      Iniciar Sesión
                    </Button>
                    <Link to="/RegistroUsuario">
                      <Button variant="secondary" className='buttom-left'>
                        Registrarse
                      </Button>
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  export default Login;
