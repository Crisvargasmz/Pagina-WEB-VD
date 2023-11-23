import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaSistrix, FaPencil, FaTrashCan} from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Gestionmarca({rol}) {
  const [marcas, setMarcas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedmarca, setSelectedmarca] = useState({});
  const [formData, setFormData] = useState({
    nombre_Categoria: '',
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

  
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteMarcaId, setDeleteMarcaId] = useState(null);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMarca = marcas.filter((marca) => {
    const nombre_Marca = marca.nombre_Marca.toLowerCase();
    const search = searchQuery.toLowerCase();

    return (
      nombre_Marca.includes(search)
    );
  });

  const [warningMessage, setWarningMessage] = useState('');
// Función para abrir el modal y pasar los datos del producto seleccionado
  const openModal = (marca) => {
    setSelectedmarca(marca);

    setFormData({
      nombre_Marca: marca.nombre_Marca,

    });
    setShowModal(true);
  };

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadMarca = () => {
    fetch('http://localhost:5000/crud/readmarcas')
      .then((response) => response.json())
      .then((data) => setMarcas(data))
      .catch((error) => console.error('Error al obtener las Marca:', error));
  };
  useEffect(() => {
    loadMarca();
  }, []);

  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updatemarca/${selectedmarca.id_Marca}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          notifySuccess('Marca actualizada correctamente');
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de productos
          setShowModal(false);
          loadMarca(); // Cargar la lista de productos actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  const handleDelete = (id_Marca) => {
    setDeleteMarcaId(id_Marca);
    setShowDeleteModal(true);
  };

  // Función para eliminar una categoría
 const confirmDelete = () => {
         // Realiza la solicitud DELETE al servidor para eliminar la categoría
        fetch(`http://localhost:5000/crud/deletemarcas/${deleteMarcaId}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              notifySuccess('Registro eliminado correctamente');
              // La eliminación fue exitosa, refresca la lista de categorías
              loadMarca();
            } else {
              // La eliminación no fue exitosa, verificar si es debido a una restricción o constraint
              return response.json();
            }
          })
          .then((data) => {
            if (data && data.error) {
              // Mostrar un mensaje de error en caso de restricción
              setWarningMessage('No se puede eliminar esta marca porque está vinculada a un producto.');
              // Limpia el mensaje después de dos segundos
              setTimeout(() => {
                setWarningMessage('');
              }, 2000); // 2000 milisegundos = 2 segundos
            }
          })
          .catch((error) => console.error('Error al eliminar el producto:', error))
          .finally(() => {
            setShowDeleteModal(false);
            setDeleteMarcaId(null);
          });
        };
        

  

  return (
    <div>
          <ToastContainer/>
      <Header rol={rol}/>

 

      <Card className="global-margin-top">
        <Card.Body>
          <Card.Title className="mb-3 title ">Listado de Marcas</Card.Title>

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

                 {/* Agregar un mensaje de advertencia si existe uno */}
        {warningMessage && (
        <Alert variant="warning" onClose={() => setWarningMessage('')} dismissible>
          {warningMessage}
        </Alert>
      )}

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredMarca.map((marca) => (
                <tr key={marca.id_Marca}>
                  <td>{marca.id_Marca}</td>
                  <td>{marca.nombre_Marca}</td>
                  <td>
                    <Button className='actualizar' variant="primary" onClick={() => openModal(marca)}><FaPencil/></Button>
                    <Button className='eliminar' variant="danger" onClick={() => handleDelete(marca.id_Marca)}><FaTrashCan/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Marca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>

              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="nombre_Marca" label="Nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre"
                        name="nombre_Marca"
                        value={formData.nombre_Marca}
                        onChange={handleFormChange}
                        onKeyDown={(e) => {
                          // Permitir solo caracteres no numéricos
                          if ((e.key >= '0' && e.key <= '9') || e.key === 'Backspace' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                            e.preventDefault();
                          }
                        }}
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
          <Button variant="primary" className='button-color' onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Confirmar eliminación</Modal.Title>
  </Modal.Header>
  <Modal.Body className='center'>
    ¿Seguro que deseas eliminar esta marca?
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
      Cancelar
    </Button>
    <Button variant="danger" onClick={confirmDelete}>
      Eliminar
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
}

export default Gestionmarca;
