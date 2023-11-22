import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';  // Importa 'jspdf-autotable'
import Header from '../components/Header'; 
import Chart from 'chart.js/auto';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';

function Estadisticas({ rol }) {
  const [compras, setCompras] = useState([]);
  const [myChart, setMyChart] = useState(null);
  const [myChart2,setMyChart2] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/crud/readDetalleCompras')
      .then((response) => response.json())
      .then((data) => setCompras(data))
      .catch((error) => console.error('Error al obtener los detalles de compra:', error));
  }, []);


  useEffect(() => {
    if (compras.length > 0) {
      const ctx = document.getElementById('myChart2');

      if (myChart2 !== null) {
        myChart2.destroy();
      }

      const nombresProductos = compras.map((compra) => compra.nombre_Producto);
      const cantidad = compras.map((compra) => compra.cantidad);

      const almacen = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: nombresProductos,
          datasets: [{
            label: 'Cantidad de productos',
            data: cantidad,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setMyChart2(almacen);
    }
  }, [compras]);

  useEffect(() => {
    if (compras.length > 0) {
      const ctx = document.getElementById('myChart');

      if (myChart !== null) {
        myChart.destroy();
      }

      const nombresProductos = compras.map((compra) => compra.nombre_Producto);
      const totalcompra = compras.map((compra) => compra.total_Compra);

      const almacen = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: nombresProductos,
          datasets: [{
            label: 'Total de las compras',
            data: totalcompra,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setMyChart(almacen);
    }
  }, [compras]);

  const generarReporteCompras = () => {
    fetch('http://localhost:5000/crud/readDetalleCompras')
      .then((response) => response.json())
      .then((detallesCompra) => {
        console.log('Detalles de compra obtenidos:', detallesCompra);
  
        const doc = new jsPDF();
        doc.text('Reporte de Detalles de Compra', 20, 10);
  
        const headers = ['Producto','Precio', 'Precio Compra', 'Stock', 'Cantidad Compra', 'Total Compra'];
        const data = detallesCompra.map((detalleCompra) => [
          detalleCompra.nombre_Producto,
          `C$ ${detalleCompra.precio.toFixed(2)}`, // Agrega el signo de córdoba y formatea a dos decimales
        `C$ ${detalleCompra.precio_Compra.toFixed(2)}`, // Agrega el signo de córdoba y formatea a dos decimales
          detalleCompra.cantidad,
          detalleCompra.cantidad_Compra,
          `C$ ${detalleCompra.total_Compra.toFixed(2)}`, // Agrega el signo de córdoba y formatea a dos decimales
        ]);
  
        // Agrega la tabla de detalles al documento PDF
        doc.autoTable({
          startY: 20,
          head: [headers],
          body: data,
          theme: 'striped',
          margin: { top: 15 },
        });
  
        doc.save('reporte_compras.pdf');
        console.log('Documento PDF generado y descargado.');
      })
      .catch((error) => console.error('Error al obtener los detalles de compra:', error));
  };

  const generarReporteAlmacen = () => {
    fetch('http://localhost:5000/crud/readDetalleCompras')
      .then((response) => response.json())
      .then((detallesCompra) => {
        console.log('Estado de almacen:', detallesCompra);
      
        const doc = new jsPDF();
        doc.text('Reporte de almacen', 20, 10);
      
        const headers = ['Producto', 'Precio', 'Stock'];
        const data = detallesCompra.map((detalleCompra) => [
          detalleCompra.nombre_Producto,
          `C$ ${detalleCompra.precio.toFixed(2)}`,
          detalleCompra.cantidad,
        ]);
      
        try {
          doc.autoTable({
            startY: 20,
            head: [headers],
            body: data,
            theme: 'striped',
            margin: { top: 15 },
          });
      
          doc.save('reporte_productos.pdf');
          console.log('Documento PDF generado y descargado.');
        } catch (error) {
          console.error('Error al generar el PDF con autoTable:', error);
        }
      })
      .catch((error) => console.error('Error al obtener el stock:', error));      
  };
  
    // Definición de la función generarReporteAlmacenImg como una función asíncrona
const generarReporteComprasImg = async () => {
  try {
    // Utiliza html2canvas para capturar el contenido del elemento con el ID 'myChart' y obtener un objeto canvas
    const canvas = await html2canvas(document.getElementById('myChart'));
    // Crea un nuevo objeto jsPDF para trabajar con documentos PDF
    const pdf = new jsPDF();
    // Convierte el objeto canvas a una URL de datos en formato PNG
    const imgData = canvas.toDataURL('image/png');
    // Añade un texto al documento PDF
    pdf.text("Reporte de las compras", 20, 10);
    // Añade la imagen capturada del gráfico al documento PDF, con ajustes de coordenadas y tamaño
    pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
    // Guarda el documento PDF con un nombre específico
    pdf.save("reporte_compras_Imagen.pdf");
  } catch (error) {
    // Captura y maneja cualquier error que pueda ocurrir durante la ejecución del bloque try
    console.error('Error al generar el reporte con imagen:', error);
  }
};

const generarReporteAlmacenImg = async () => {
  try {
    // Utiliza html2canvas para capturar el contenido del elemento con el ID 'myChart' y obtener un objeto canvas
    const canvas = await html2canvas(document.getElementById('myChart2'));
    // Crea un nuevo objeto jsPDF para trabajar con documentos PDF
    const pdf = new jsPDF();
    // Convierte el objeto canvas a una URL de datos en formato PNG
    const imgData = canvas.toDataURL('image/png');
    // Añade un texto al documento PDF
    pdf.text("Reporte del almacen", 20, 10);
    // Añade la imagen capturada del gráfico al documento PDF, con ajustes de coordenadas y tamaño
    pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
    // Guarda el documento PDF con un nombre específico
    pdf.save("reporte_Almacen_Imagen.pdf");
  } catch (error) {
    // Captura y maneja cualquier error que pueda ocurrir durante la ejecución del bloque try
    console.error('Error al generar el reporte con imagen:', error);
  }
};





  return (
    <div>
      <Header rol={ rol } />  

      <Container className="mt-8"> {/* Add margin-top to the Container */}
        <Row className="global-margin-top-history">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Estados de las compras</Card.Title>
                <div style={{ margin: '20px 0' }}> {/* Add margin to the canvas */}
                  <canvas id="myChart" height="200"></canvas> {/* Adjust height as needed */}
                </div>
              </Card.Body>

              <Card.Footer className="text-center">
                <Button variant="primary" className='buttom-right button-color' onClick={generarReporteCompras}>
                  Generar Reporte
                </Button>
                <Button className='buttom-left button-color' onClick={generarReporteComprasImg}>
                  Generar reporte con imagen
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="mt-8"> {/* Add margin-top to the Container */}
        <Row className="global-margin-top-history">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Estados de Almacen</Card.Title>
                <div style={{ margin: '20px 0' }}> {/* Add margin to the canvas */}
                  <canvas id="myChart2" height="200"></canvas> {/* Adjust height as needed */}
                </div>
              </Card.Body>

              <Card.Footer className="text-center">
                <Button variant="primary" className='buttom-right button-color' onClick={generarReporteAlmacen}>
                  Generar Reporte
                </Button>
                <Button className='buttom-left button-color' onClick={generarReporteAlmacenImg}>
                  Generar reporte con imagen
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>

  );
}

export default Estadisticas;
