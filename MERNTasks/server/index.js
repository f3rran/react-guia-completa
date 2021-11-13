const express = require('express');
const connectDB = require('./config/db');

//Crear el servidor
const app = express();

//Conectar a la BD
connectDB();

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Inicializar la app
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
})