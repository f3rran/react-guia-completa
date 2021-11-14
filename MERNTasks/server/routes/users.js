//Rutas para crear usuarios
const express = require('express');
const {check} = require('express-validator');
const router = express.Router();

const userController = require('../controllers/userController');

//Crea un usuario
// api/users
router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
    ] , userController.createUsuario);

module.exports = router