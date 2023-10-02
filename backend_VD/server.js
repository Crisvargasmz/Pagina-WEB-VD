const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(express.json());

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '130605',
    database: 'variedadesduarte'

    });

    db.connect((err) => {

    if (err) {

    console.error('Error de conexión a la base de datos:', err);
} else {
    console.log('Conexión exitosa a la base de datos' );
    }
});
    // Configuración de CORS
    app.listen(port, () => {
        console.log(`Servidor backend en funcionapuertomiento en el  ${port}`);

});

const crudRoutes = require('./routes/crudRoutes.js')(db);
app.use('/crud', crudRoutes);