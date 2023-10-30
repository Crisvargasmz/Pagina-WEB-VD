import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import { FaSistrix} from 'react-icons/fa6';
import { FaSave,FaPlus } from 'react-icons/fa';
import axios from 'axios';

function Producto() {
  const [nombre_Producto, setNombre_Producto] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [formData, setFormData] = useState({
    id_Marca: '',
    id_Categoria: '',
  });

  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showMarcaModal, setShowMarcaModal] = useState(false);
  const [showCateModal, setShowCateModal] = useState(false);

  const [nombre_Marca, setNombre_Marca] = useState('');

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
    loadCategorias();
    loadMarcas();
  }, []);

  const openCategoryModal = () => {
    setShowCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setShowCategoryModal(false);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setFormData({
      ...formData,
      id_Categoria: category.id_Categoria,
    });
    closeCategoryModal();
  };

  const openBrandModal = () => {
    setShowBrandModal(true);
  };

  const closeBrandModal = () => {
    setShowBrandModal(false);
  };

  const selectBrand = (brand) => {
    setSelectedBrand(brand);
    setFormData({
      ...formData,
      id_Marca: brand.id_Marca,
    });
    closeBrandModal();
  };

  const openMarcaModal = () => {
    setShowMarcaModal(true);
  };

  const closeMarcaModal = () => {
    setShowMarcaModal(false);
  };


  const openCateModal = () => {
    setShowCateModal(true);
  };

  const closeCateModal = () => {
    setShowCateModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      nombre_Producto,
      presentacion,
      imagen,
      descripcion,
      precio,
      cantidad,
      id_Marca: formData.id_Marca,
      id_Categoria: formData.id_Categoria,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createproducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Registro exitoso');
        setNombre_Producto('');
        setPresentacion('');
        setImagen('');
        setDescripcion('');
        setPrecio('');
        setCantidad('');
        setFormData({
          id_Marca: '',
          id_Categoria: '',
        });
        setSelectedCategory(null);
        setSelectedBrand(null);
      } else {
        alert('Error al registrar producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  const handleSubmitmarca = async (e) => {
    e.preventDefault();

    const formData = {
      nombre_Marca,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createmarca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registro exitoso');
        loadMarcas();
        setNombre_Marca('');
      } else {
        alert('Error al registrar la marca');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  const [nombre_Categoria, setNombre_Categoria] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmitcategoria = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre_Categoria,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createcategoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        loadCategorias();
        // Reiniciar los campos del formulario
        setNombre_Categoria('');
      } else {
        alert('Error al registrar la categoria');
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
            <Card.Title>Registro de Producto</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre_Producto" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre_Producto}
                      onChange={(e) => setNombre_Producto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="presentacion" label="Presentación">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la presentación"
                      value={presentacion}
                      onChange={(e) => setPresentacion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="imagen" label="Imagen">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese una imagen"
                      value={imagen}
                      onChange={(e) => setImagen(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="descripcion" label="Descripción">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la descripción"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="precio" label="Precio">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el precio"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="cantidad" label="Cantidad">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese la cantidad"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="marca" label="Marca">
                    <Form.Control
                      type="text"
                      placeholder="Marca seleccionada"
                      name="marca"
                      value={selectedBrand ? selectedBrand.nombre_Marca : ''}
                      readOnly
                    />
                    <div className="button-container">
                      <Button className="show-button" variant="primary" onClick={openBrandModal}>
                        <FaSistrix />
                      </Button>
                      <Button className="show-button1" variant="primary" onClick={openMarcaModal}>
                        <FaPlus />
                      </Button>
                    </div>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="categoria" label="Categoría">
                    <Form.Control
                      type="text"
                      placeholder="Categoría seleccionada"
                      name="categoria"
                      value={selectedCategory ? selectedCategory.nombre_Categoria : ''}
                      readOnly
                    />
                    <div className="button-container">
                    <Button className="show-button" variant="primary" onClick={openCategoryModal}>
                      <FaSistrix />
                    </Button>
                    <Button className="show-button1" variant="primary" onClick={openCateModal}>
                        <FaPlus />
                      </Button>
                    </div>
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

      <Modal show={showCategoryModal} onHide={closeCategoryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {categorias.map((category) => (
            <div className="Seleccion" key={category.id_Categoria} onClick={() => selectCategory(category)}>
              {category.nombre_Categoria}
            </div>
          ))}
        </Modal.Body>
      </Modal>

      <Modal show={showBrandModal} onHide={closeBrandModal}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Marca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {marcas.map((brand) => (
            <div className="Seleccion" key={brand.id_Marca} onClick={() => selectBrand(brand)}>
              {brand.nombre_Marca}
            </div>
          ))}
        </Modal.Body>
      </Modal>

      <Modal show={showMarcaModal} onHide={closeMarcaModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registro de Marca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitmarca}>
            <FloatingLabel controlId="nombre_Marca" label="Nombre">
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la marca"
                value={nombre_Marca}
                onChange={(e) => setNombre_Marca(e.target.value)}
              />
            </FloatingLabel>
            <div className="center-button">
              <Button variant="primary" type="submit" className="mt-3">
                Registrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      
      <Modal show={showCateModal} onHide={closeCateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registro de Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitcategoria}>
            <FloatingLabel controlId="nombre_Categoria" label="Nombre">
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la Categoria"
                value={nombre_Categoria}
                onChange={(e) => setNombre_Categoria(e.target.value)}
              />
            </FloatingLabel>
            <div className="center-button">
              <Button variant="primary" type="submit" className="mt-3">
                Registrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

       

    </div>
  );
}

export default Producto;
