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

// Obtener todos los proyectos
router.get('/', auth, projectController.getProjects);

//Actualizar proyecto mediante su ID
router.put('/:id',auth, [
    check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
], projectController.updateProject);

//Eliminar proyecto
router.delete('/:id',auth, projectController.deleteProject);

module.exports = router;