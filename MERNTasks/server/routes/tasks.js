const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crear una tarea
//  /api/tasks
router.post('/',auth,[
    check('name', 'El nombre de la tarea es obligatorio').not().isEmpty(),
    check('projectId', 'El proyecto es obligatorio').not().isEmpty(),
], taskController.createTask);

module.exports = router;