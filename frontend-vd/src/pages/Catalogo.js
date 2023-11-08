import React, { useState, useEffect } from 'react';  // Importa las funciones useState y useEffect de React
import { Row, Col, Container, Card, Badge, Form, FloatingLabel } from 'react-bootstrap';  // Importa componentes de react-bootstrap
import Header from '../components/Header';  // Importa el componente Header desde su ubicación relativa
import '../styles/App.css';  // Importa estilos CSS del archivo App.css

function Catalogo({ rol }) {  // Define un componente funcional Galeria que recibe props

    const [productos, setProductos] = useState([]);  // Crea un estado para almacenar la lista de productos
    const [searchQuery, setSearchQuery] = useState('');  // Crea un estado para almacenar la cadena de búsqueda
    const [marcas, setMarcas] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const handleSearchChange = (e) => {  // Función para manejar cambios en la búsqueda
        setSearchQuery(e.target.value);  // Actualiza el estado con la cadena de búsqueda ingresada
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

    useEffect(() => {  // Realiza una solicitud GET al servidor para obtener los productos
        fetch('http://localhost:5000/crud/readproducto')  // Realiza una petición GET al servidor
            .then((response) => response.json())  // Convierte la respuesta a formato JSON
            .then((data) => setProductos(data))  // Actualiza el estado con la lista de productos obtenida
            .catch((error) => console.error('Error al obtener los productos:', error));  // Maneja errores en la obtención de productos
    }, []);  // Se ejecuta solo en la primera renderización del componente

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

                <Row className="mt-11">
                    <Col sm="6" md="6" lg="4">
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

                <Row className="g-3">
                    {filteredProducto.map((producto) => (
                        <Col sm="12" md="4" lg="3">
                            <Card>
                                <Card.Img className="image-card" variant="top" src={producto.imagen} alt={producto.nombre}/>
                                <Card.Body>
                                    <Card.Title>{producto.nombre_Producto}</Card.Title>
                                    <Card.Text>
                                        {producto.descripcion}
                                    </Card.Text>
                                    <div>
                                        <Badge bg="primary">Almacen: {producto.cantidad}</Badge>
                                        <Badge bg="success">Precio: {producto.precio}</Badge>
                                        <Badge bg="warning" text="dark">

                                        </Badge>
                                    </div>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Link href="/producto">Comprar</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

        </div>
    );
}
export default Catalogo; 
