import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Card, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function RegistroUsuario(rol) {
  const navigate = useNavigate();
  const [nombre_Usuario, setNombre_Usuario] = useState('');
  const [correo_Electronico, setCorreo_Electronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rolUser, setRolUser] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const [formErrors, setFormErrors] = useState({
    nombre_Usuario: '',
    correo_Electronico: '',
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



  const handleSubmit = async (e) => {
    e.preventDefault();

 
        // Validar campos vacíos
        const errors = {};

        if (!nombre_Usuario) {
          errors.nombre_Usuario = 'Ingrese un nombre de usuario';
        }
    
        if (!correo_Electronico) {
          errors.correo_Electronico = 'Ingrese un correo';
        }
    
        if (!contrasena) {
          errors.contrasena = 'Ingrese la contraseña';
        }
  
    
        // Actualizar el estado de los errores
        setFormErrors(errors);
    
        // Si hay errores, detener el envío del formulario
        if (Object.values(errors).some((error) => error !== '')) {
          return;
        }
    

    const formData = {
      nombre_Usuario,
      correo_Electronico,
      contrasena,
      rol: 'cliente',
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
        notifySuccess('Registro exitoso');
        setNombre_Usuario('');
        setCorreo_Electronico('');
        setContrasena('');
        setRolUser('');
        // Redirigir a la pantalla de inicio de sesión después del registro exitoso
        navigate('/');
      } else {
        notifyError('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };


  return (
    <div>
        <ToastContainer/>
      <Header rol={rol} />

      <Container>
        <Card className="global-margin-top">
          <Card.Body>
            <Card.Title className="mb-3 title ">Registro de Usuario</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre_Usuario" label="Nombre de Usuario">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre de usuario"
                      value={nombre_Usuario}
                      onChange={(e) => setNombre_Usuario(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                      pattern="[a-zA-Z]+[a-zA-Z0-9_]*"
                      minLength="6"
                      maxLength="20"
                    />
                  </FloatingLabel>
                  {formErrors.nombre_Usuario && <div className="error-message">{formErrors.nombre_Usuario}</div>}
                </Col>


                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="contrasena" label="Contraseña">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                      title="Debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial."
                      placeholder="Ingrese una la contraseña"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                    />
                    <Button
                        variant="link"
                        className="show-password-button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </Button>
                  </FloatingLabel>
                  {formErrors.contrasena && <div className="error-message">{formErrors.contrasena}</div>}
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
                  {formErrors.correo_Electronico && <div className="error-message">{formErrors.correo_Electronico}</div>}
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

export default RegistroUsuario;
