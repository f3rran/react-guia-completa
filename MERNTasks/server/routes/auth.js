//Rutas para crear usuarios
const express = require('express');
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();
const auth = require('../middleware/auth');


//Autenticar usuario
// api/auth
router.post('/',[
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
    ] , authController.authenticateUser);

//Obtener usuario autenticado
router.get('/',
    auth,
    authController.userAuthenticated
);

module.exports = router;