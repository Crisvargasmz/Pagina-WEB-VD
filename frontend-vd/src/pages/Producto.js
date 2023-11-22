import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import { FaSistrix } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

function Producto({ rol }) {
  const [nombre_Producto, setNombre_Producto] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [formData, setFormData] = useState({
    id_Marca: '',
    id_Categoria: '',
  });

  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null); // Nuevo estado para el archivo de imagen

  const [searchQueryMarca, setSearchQueryMarca] = useState('');
  const [searchQueryCate, setSearchQueryCate] = useState('');

  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMarcas, setSelectedMarcas] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showMarcasModal, setShowMarcasModal] = useState(false);

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



  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Actualiza el estado imageFile
      const formData = new FormData();
      formData.append('imagen', file);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData);
        if (response.data.imageUrl) {
          setImageUrl(response.data.imageUrl);
        }
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
        // Manejar el error de carga de la imagen
      }
    }
  };

  const openCategoryModal = () => {
    setShowCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setSearchQueryCate('');
    setShowCategoryModal(false);
  };

  const openBrandModal = () => {
    setShowMarcasModal(true);
  };

  const closeBrandModal = () => {
    setSearchQueryMarca('');
    setShowMarcasModal(false);

  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setFormData({
      ...formData,
      id_Categoria: category.id_Categoria,
    });
    closeCategoryModal();
  };

  const selectedMarca = (brand) => {
    setSelectedMarcas(brand);
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

    // Validar campos vacíos
    if (!nombre_Producto || !presentacion || !imageUrl || !descripcion || !precio || !cantidad || !formData.id_Marca || !formData.id_Categoria) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append('nombre_Producto', nombre_Producto);
    dataToSend.append('presentacion', presentacion);
    dataToSend.append('imagen', imageUrl);
    dataToSend.append('descripcion', descripcion);
    dataToSend.append('precio', precio);
    dataToSend.append('cantidad', cantidad);
    dataToSend.append('id_Marca', formData.id_Marca);
    dataToSend.append('id_Categoria', formData.id_Categoria);

    try {
      const response = await axios.post('http://localhost:5000/crud/createproducto', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message === 'producto insertado con éxito') {
        alert('Registro Exitoso');
        setImageUrl('');
        setImageFile(null);
        setNombre_Producto('');
        setPresentacion('');
        setDescripcion('');
        setPrecio('');
        setCantidad('');
        setFormData({
          id_Marca: '',
          id_Categoria: '',
        });
        setSelectedCategory(null);
        setSelectedMarcas(null);
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

    if (!nombre_Marca) {
      alert('Por favor, completa todos los campos');
      return;
    }

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

  const handleSubmitcategoria = async (e) => {
    e.preventDefault();

    // Validar campos vacíos
    if (!nombre_Categoria) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const formData = {
      nombre_Categoria,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createcategoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registro exitoso');
        loadCategorias();
        setNombre_Categoria('');
      } else {
        alert('Error al registrar la categoria');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  const handleSearchChangeMarca = (e) => {
    setSearchQueryMarca(e.target.value);
  };

  const handleSearchChangeCate = (e) => {
    setSearchQueryCate(e.target.value);
  };

  const filteredMarca = marcas.filter((marca) => {
    const nombre_Marca = marca.nombre_Marca.toLowerCase();
    const search = searchQueryMarca.toLowerCase();
    return nombre_Marca.includes(search);
  });

  const filteredCategorias = categorias.filter((categoria) => {
    const nombre_Categoria = categoria.nombre_Categoria.toLowerCase();
    const search = searchQueryCate.toLowerCase();
    return nombre_Categoria.includes(search);
  });

  const handlePrecioChange = (e) => {
    // Validar que solo se ingresen números no negativos
    const nuevoPrecio = e.target.value.replace(/[^0-9.]/g, ''); // Eliminar caracteres no numéricos, excepto el punto para decimales
    setPrecio(nuevoPrecio);
  };

  const handleCantidadChange = (e) => {
    // Validar que solo se ingresen números no negativos
    const nuevaCantidad = e.target.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
    setCantidad(nuevaCantidad);
  };

  const handleNombreChange = (e) => {
    // Validar que solo se ingresen letras
    const nuevoNombre = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo permite letras y espacios
    setNombre_Producto(nuevoNombre);
  };

  const handleNombreMarcaChange = (e) => {
    // Validar que solo se ingresen letras
    const nuevoNombre = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo permite letras y espacios
    setNombre_Marca(nuevoNombre);
  };

  const handleNombreCategoriaChange = (e) => {
    // Validar que solo se ingresen letras
    const nuevoNombre = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo permite letras y espacios
    setNombre_Categoria(nuevoNombre);
  };


  const handleNombrePresentacionChange = (event) => {
    // Validar que solo se ingresen letras, números y espacios
    const inputValue = event.target.value;
    const regex = /^[a-zA-Z0-9\s]*$/;
  
    if (regex.test(inputValue) || inputValue === '') {
      setPresentacion(inputValue);
    }
  };
  






  return (
    <div>

      <Header rol={rol} />

      <Container>
        <Card className="global-margin-top">
          <Card.Body>
            <Card.Title className="mt-3 title">Registro de Producto</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre_Producto" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre_Producto}
                      onChange={handleNombreChange}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="presentacion" label="Presentación">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la presentación"
                      value={presentacion}
                      onChange={handleNombrePresentacionChange}
                      
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="6">
                  <Form.Group controlId="selectedFile" className="mb-3">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control
                      className="custom-file-input" // Aplica la clase personalizada aquí
                      type="file"
                      accept=".jpg, .png, .jpeg"
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                </Col>
                <Col sm="6" md="6" lg="6">
  <FloatingLabel controlId="descripcion" label="Descripción">
    <Form.Control
      as="textarea"
      className="auto-expand-textarea" // Aplica la clase personalizada aquí
      style={{ minHeight: '100px' }} // Establece la altura inicial aquí
      placeholder="Ingrese la descripción"
      value={descripcion}
      onChange={(e) => {
        setDescripcion(e.target.value);
        e.target.style.height = 'auto'; // Restablece la altura a 'auto' para calcular la nueva altura
        e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta la altura automáticamente
      }}
      onKeyDown={(e) => {
        // Permitir solo letras, números y espacios
        if (!((e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z') || (e.key >= '0' && e.key <= '9') || e.key === ' ')) {
          e.preventDefault();
        }
      }}
    />
  </FloatingLabel>
</Col>
                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="precio" label="">
                    <div className="input-group">
                      <span className="input-group-text">C$</span>
                      <Form.Control
                        className="input-size"
                        type="text" // Mantenido como tipo texto para permitir decimales
                        placeholder="Ingrese el precio"
                        value={precio}
                        onChange={handlePrecioChange}
                      />
                    </div>
                  </FloatingLabel>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="cantidad" label="Cantidad">
                    <Form.Control
                      type="text" // Mantenido como tipo texto para permitir solo números enteros
                      placeholder="Ingrese la cantidad"
                      value={cantidad}
                      onChange={handleCantidadChange}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="marca" label="Marca">
                    <Form.Control
                      type="text"
                      placeholder="Marca seleccionada"
                      name="marca"
                      value={selectedMarcas ? selectedMarcas.nombre_Marca : ''}
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
                <Button variant="primary" type="submit" className="mt-3 button-color" size="lg">
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
        <Row className="mt-3">
          <Col className='search-input'>
            <FloatingLabel controlId="search" label="Buscar">
              <Form.Control
                type="text"
                placeholder="Buscar"
                value={searchQueryCate}
                onChange={handleSearchChangeCate}
                onKeyDown={(e) => {
                  // Permitir solo letras, números y espacios
                  if (!((e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z') || (e.key >= '0' && e.key <= '9') || e.key === ' ')) {
                    e.preventDefault();
                  }
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Modal.Body>
          {filteredCategorias.map((category) => (
            <div className="Seleccion" key={category.id_Categoria} onClick={() => selectCategory(category)}>
              {category.nombre_Categoria}
            </div>
          ))}
        </Modal.Body>
      </Modal>

      <Modal show={showMarcasModal} onHide={closeBrandModal}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Marca</Modal.Title>
        </Modal.Header>
        <Row className="mt-3">
          <Col className='search-input'>
            <FloatingLabel controlId="search" label="Buscar">
              <Form.Control
                type="text"
                placeholder="Buscar"
                value={searchQueryMarca}
                onChange={handleSearchChangeMarca}
                onKeyDown={(e) => {
                  // Permitir solo letras, números y espacios
                  if (!((e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z') || (e.key >= '0' && e.key <= '9') || e.key === ' ')) {
                    e.preventDefault();
                  }
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Modal.Body>
          {filteredMarca.map((brand) => (
            <div className="Seleccion" key={brand.id_Marca} onClick={() => selectedMarca(brand)}>
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
                onChange={handleNombreMarcaChange}
                onKeyDown={(e) => {
                  // Permitir solo letras, números y espacios
                  if (!((e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z') || (e.key >= '0' && e.key <= '9') || e.key === ' ')) {
                    e.preventDefault();
                  }
                }}
              />
            </FloatingLabel>
            <div className="center-button">
              <Button variant="primary" type="submit" className="mt-3" onClick={closeMarcaModal}>
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
                onChange={handleNombreCategoriaChange}
                onKeyDown={(e) => {
                  // Permitir solo letras, números y espacios
                  if (!((e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z') || (e.key >= '0' && e.key <= '9') || e.key === ' ')) {
                    e.preventDefault();
                  }
                }}
              />
            </FloatingLabel>
            <div className="center-button">
              <Button variant="primary" type="submit" className="mt-3" onClick={closeCateModal}>
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