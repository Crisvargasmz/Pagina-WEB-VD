import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaSistrix, FaPencil, FaTrashCan} from 'react-icons/fa6';

function Gestionproducto() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedproducto, setSelectedProducto] = useState({});
  const [formData, setFormData] = useState({
    nombre_Producto: '',
    presentacion: '',
    imagen: '',
    descripcion: '',
    precio: '',
    cantidad: '',
    id_Marca: '',
    id_Categoria: '',
  });
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);

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

  const openModal = (producto) => {
    setSelectedProducto(producto);

    setFormData({
      nombre_Producto: producto.nombre_Producto,
      presentacion: producto.presentacion,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: producto.cantidad,
      id_Marca: producto.id_Marca,
      id_Categoria: producto.id_Categoria,
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === 'id_Categoria' || name === 'id_Marca') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const loadProducto = () => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

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
    loadProducto();
    loadMarcas();
    loadCategorias();
  }, []);

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updateproducto/${selectedproducto.id_Producto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadProducto();
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  const handleDelete = (id_Producto) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este producto?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteproducto/${id_Producto}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadProducto();
          }
        })
        .catch((error) => console.error('Error al eliminar el producto:', error));
    }
  };

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

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3 title ">Listado de Productos</Card.Title>

          <Row className="mb-3">
            <Col>
              <FloatingLabel controlId="search" label="Buscar">
                <Form.Control
                  type="text"
                  placeholder="Buscar"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Table striped bordered hover>
            <thead>
              <tr className='centrado'>
                <th>ID</th>
                <th>Nombre</th>
                <th>Presentación</th>
                <th>Imagen</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Marca</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducto.map((producto) => (
                <tr className='centrado' key={producto.id_Producto}>
                  <td>{producto.id_Producto}</td>
                  <td>{producto.nombre_Producto}</td>
                  <td>{producto.presentacion}</td>
                  <td>{producto.imagen}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.cantidad}</td>
                  <td>{marcas.find((marca) => marca.id_Marca === producto.id_Marca)?.nombre_Marca}</td>
                  <td>{categorias.find((categoria) => categoria.id_Categoria === producto.id_Categoria)?.nombre_Categoria}</td>
                  <td>
                    <Button className='actualizar' variant="primary" onClick={() => openModal(producto)}><FaPencil/></Button>
                    <Button className='eliminar' variant="danger" onClick={() => handleDelete(producto.id_Producto)}><FaTrashCan/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de producto</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombre_Producto" label="Nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre"
                        name="nombre_Producto"
                        value={formData.nombre_Producto}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="presentacion" label="Presentación">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la presentación"
                        name="presentacion"
                        value={formData.presentacion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="imagen" label="Imagen">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la imagen"
                        name="imagen"
                        value={formData.imagen}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="8">
                    <FloatingLabel controlId="descripcion" label="Descripción">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la descripción"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="precio" label="Precio">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el precio"
                        name="precio"
                        value={formData.precio}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="cantidad" label="Cantidad">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese la cantidad"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="categoria" label="Categoría">
                      <Form.Control
                        type="text"
                        placeholder="Categoría seleccionada"
                        name="categoria"
                        value={selectedCategory ? selectedCategory.nombre_Categoria : ''}
                        readOnly
                      />
                      <Button className='show-button' variant="primary" onClick={openCategoryModal}>
                      <FaSistrix/>
                      </Button>
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="marca" label="Marca">
                      <Form.Control
                        type="text"
                        placeholder="Marca seleccionada"
                        name="marca"
                        value={selectedBrand ? selectedBrand.nombre_Marca : ''}
                        readOnly
                      />
                      <Button className='show-button' variant="primary" onClick={openBrandModal}>
                      <FaSistrix/>
                      </Button>
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

      <Modal show={showCategoryModal} onHide={closeCategoryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {categorias.map((category) => (
            <div className='Seleccion' key={category.id_Categoria} onClick={() => selectCategory(category)}>
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
            <div className='Seleccion' key={brand.id_Marca} onClick={() => selectBrand(brand)}>
              {brand.nombre_Marca}
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Gestionproducto;
