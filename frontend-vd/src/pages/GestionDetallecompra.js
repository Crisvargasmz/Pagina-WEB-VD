import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaSistrix, FaPencil, FaTrashCan } from 'react-icons/fa6';


function GestionDetalle({ rol }) {
  const [compras, setCompras] = useState([]);
  const [selectedcompra, setSelectedCompra] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cantidad_Compra: '',
    precio_Compra: '',
    nombre_Producto: '',
    total_Compra: '',
    estado: '',
  });

/*
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCompras = compras.filter((compra) => {
    const estado = compra.estado.toLowerCase();
    const search = searchQuery.toLowerCase();

    return (
      estado.includes(search)
    );
  });
  */


  function formatearNumeroConComas(numero) {
    // Aplica toFixed para limitar los decimales a dos
    const numeroFormateado = Number(numero).toFixed(2);
    
    // Usa una expresión regular para agregar comas
    return numeroFormateado.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const openModal = (compra) => {
    setSelectedCompra(compra);

    setFormData({
      cantidad_Compra: compra.cantidad_Compra,
     precio_Compra: compra.precio_Compra,
      nombre_Producto: compra.nombre_Producto,
      total_Compra: compra.total_Compra,
       estado: compra.estado,
    });

    setShowModal(true);
  };


  const loadDetalle = () => {
    fetch('http://localhost:5000/crud/readDetalleCompras')
      .then((response) => response.json())
      .then((data) => setCompras(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

 
  useEffect(() => {
    loadDetalle();
  }, []);


  return (
    <div>
      <Header rol={rol} />

      <Card className="global-margin-top">
        <Card.Body>
          <Card.Title className="mb-3 title ">Listado de Ventas</Card.Title>

          
        

 

          <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr className='centrado'>
                <th>ID</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((compra) => (
                <tr className='centrado' key={compra.id_Detallecompra}>
                  <td>{compra.id_Detallecompra}</td>
                  <td>{compra.nombre_Producto}</td>
                  <td>{compra.cantidad_Compra}</td>
                  <td>C${formatearNumeroConComas(compra.precio_Compra)}</td>
                  <td>C${formatearNumeroConComas(compra.total_Compra)}</td>
                  <td>{compra.estado}</td>
                  <td>
                  <div className="button-container">
    <Button className='actualizar' variant="primary" onClick={() => openModal(compra)}>
      <FaPencil />
    </Button>
    <Button className='eliminar' variant="danger" onClick={() => ("")}>
      <FaTrashCan />
    </Button>
  </div>
                  </td>
                </tr> 
              ))}
            </tbody>
          </Table>
          </div>
        </Card.Body>
      </Card>

      
    </div>
  );
}

export default GestionDetalle;
