import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Card, Badge, Form, FloatingLabel, Button,Modal } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import { FaComments } from 'react-icons/fa6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';


function Catalogo({ rol,id_Usuario}) {
  const [productos, setProductos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [calificacion, setCalificacion] = useState(0);
  const [contenido_Comentario, setContenido_Comentario] = useState('');
  const [showcomentarioModal, setShowcomentarioModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducto = productos.filter((producto) => {
    const nombre_Producto = producto.nombre_Producto.toLowerCase();
    const presentacion = producto.presentacion.toLowerCase();
    const descripcion = producto.descripcion.toLowerCase();
    const marca = marcas.find((marca) => marca.id_Marca === producto.id_Marca)?.nombre_Marca.toLowerCase();
    const categoria = categorias.find((categoria) => categoria.id_Categoria === producto.id_Categoria)?.nombre_Categoria.toLowerCase();
    const search = searchQuery.toLowerCase();

    return (
      nombre_Producto.includes(search) ||
      presentacion.includes(search) ||
      descripcion.includes(search) ||
      marca.includes(search) ||
      categoria.includes(search)
    );
  });

  const cleanSelectedProductId = () => {
   
  };

  const opencomentarioModal = (id_Producto,id_Usuario) => {
    setSelectedProductId(id_Producto);
    const Get_id_Usuario = (id_Usuario);
    console.log('id_Usuario:', Get_id_Usuario);
    console.log('id_produco', id_Producto);
    setShowcomentarioModal(true);
  };

  const closecomentarioModal = () => {
    cleanSelectedProductId();
    setShowcomentarioModal(false);

  };


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
      id_Producto: selectedProductId,
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
      } else {
        alert('Error al registrar comentario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };



  useEffect(() => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  const loadMarcas = () => {
    fetch('http://localhost:5000/crud/nombremarcas')
      .then((response) => response.json())
      .then((data) => setMarcas(data))
      .catch((error) => console.error('Error al obtener las marcas:', error));
  };

  const loadCategorias = () => {
    fetch('http://localhost:5000/crud/nombrecategorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener las categorías:', error));
  };

  useEffect(() => {
    loadMarcas();
    loadCategorias();
  }, []);

  return (
    <div>
      <Header rol={rol} />

      <Container className="margen-contenedor">

        <Row className="margin-top-search">
          <Col sm="6" md="6" lg="4">
            <FloatingLabel className="search-styles" controlId="search" label="Buscar">
              <Form.Control
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  // Permitir solo letras y números, y algunas teclas de control
                  if (!((e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z') || (e.key >= '0' && e.key <= '9') || e.key === 'Backspace' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Delete')) {
                    e.preventDefault();
                  }
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="card-styles">
          {filteredProducto.map((producto) => (
            <Col sm="12" md="4" lg="3" key={producto.id_Producto}>
              <Card className="product-card">
                <Card.Img className="image-card" variant="top" src={producto.imagen} alt={producto.nombre_Producto} />
                <Card.Body>
                  <Card.Title className="title-nombre">{producto.nombre_Producto}</Card.Title>
                  <Card.Text className="product-description">
                    {producto.descripcion}
                  </Card.Text>
                  <div>
                    
                    <div className="product-price">C$ {producto.precio.toFixed(2)}</div>
                    <Badge bg="warning" text="dark">
                      {/* Puedes agregar contenido a esta insignia si es necesario */}
                    </Badge>
                  </div>
                </Card.Body>
                <Button className='variant-primary button-color' onClick={() => opencomentarioModal(producto.id_Producto,id_Usuario)}>
                <FaComments/>
                </Button>
                <Card.Body>
                <Card.Link href="/producto" className="btn btn-primary button-color">
                      Agregar
                    </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
      </Container>
      <Modal show={showcomentarioModal} onHide={closecomentarioModal}>
  <Modal.Header closeButton>
    <Modal.Title>Comentario</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <div className="centered-inputs">
        <Col sm="6" md="6" lg="6" className="mb-3">
          <FloatingLabel controlId="calificacion" label="">
            <StarRating rating={calificacion} onRatingChange={setCalificacion} />
          </FloatingLabel>
        </Col>
        <Col sm="12" md="6" lg="12" className="mb-3">
          <FloatingLabel controlId="contenido_Comentario" label="Comentario">
            <Form.Control
              as="textarea"
              className="auto-expand-textarea"
              placeholder="Ingrese el comentario"
              value={contenido_Comentario}  
              onChange={(e) => {
                setContenido_Comentario(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={(e) => {
                // Permitir solo letras y números, y algunas teclas de control
                if (!((e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z') || (e.key >= '0' && e.key <= '9') || e.key === 'Backspace' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Delete')) {
                  e.preventDefault();
                }
              }}
            />
          </FloatingLabel>
        </Col>
        <div className="center-button">
          <Button variant="primary" type="submit" className="mt-3 button-color" onClick={closecomentarioModal}>
            Registrar
          </Button>
        </div>
      </div>
    </Form>
  </Modal.Body>
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
      <div className="star-rating-title">Calificación</div>
      <div className="star-rating">{stars}</div>
    </div>
  );
}

export default Catalogo;