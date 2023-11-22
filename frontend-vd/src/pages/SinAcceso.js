import React from 'react';
import { Card } from 'react-bootstrap';
import '../styles/App.css';

function SinAcceso() {
  return (
    <div className="sin-acceso-container">
      <Card className="sin-acceso-card" bg="danger" text="white">
        <Card.Body>
          <Card.Title> ¡SIN ACCESO!</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SinAcceso;