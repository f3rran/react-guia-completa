//Rutas para crear usuarios
const express = require('express');
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();


//Autneticar usuario
// api/auth
router.post('/',[
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
    ] , authController.authenticateUser);

module.exports = router