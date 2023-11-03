const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path');
const app = express();
const port = 5000;

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'Devloper',
  password: 'dev2023',
  database: 'variedadesduarte',
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

app.use(cors());

// Configura el almacenamiento para los archivos subidos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, Date.now() + extension); // Nombre del archivo se genera con una marca de tiempo para evitar conflictos
  },
});

// Crea una instancia de multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

// Maneja la carga de archivos
app.post('/upload', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha seleccionado ningún archivo.');
  }
  const imageUrl = 'http://localhost:5000/' + req.file.path;
  res.json({ imageUrl });
});

app.post('/upload2', upload.single('nuevaImagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha seleccionado ningún archivo.');
  }
  res.json({ imageUrl: 'http://localhost:5000/' + req.file.path });
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: 0, // No almacenar en caché (0 segundos)
}));

// Configuración de CORS
app.listen(port, () => {
  console.log(`Servidor backend funcionando en el puerto:${port}`);
});

app.use(cors());

const crudRoutes = require('./routes/crudRoutes.js')(db);
app.use('/crud', crudRoutes);
