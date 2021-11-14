const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Gestionar proyectos
// api/projects
router.post('/', auth, [
    check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
], projectController.createProject);
router.get('/', auth, projectController.createProject);

module.exports = router;