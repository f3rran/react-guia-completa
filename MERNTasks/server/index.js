const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//Crear el servidor
const app = express();

//Conectar a la BD
connectDB();

//Habiltiar CORS
app.use(cors());

//Habilitar express.json
app.use(express.json({extended: true}));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

//Inicializar la app
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
})