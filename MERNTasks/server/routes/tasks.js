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

//Obtener las tareas por proyecto
router.get('/', auth, taskController.getTasks);

//Update task
router.put('/:id', auth, taskController.updateTask);

//Eliminar tarea
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;