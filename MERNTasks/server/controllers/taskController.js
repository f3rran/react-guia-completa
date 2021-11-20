const Task = require('../models/Task');
const Project = require('../models/Project');
const {validationResult} = require('express-validator');

// Crear una nueva tarea
exports.createTask = async (req,res) => {
    //Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        //Extraer el proyecto y comprobar si existe
        const {projectId} = req.body;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({msg: "Proyecto no encontrado"});
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if (project.userId.toString() !== req.user.id) {
            return res.status(401).json({msg: "No autorizado"});
        }

        // Crear la tarea
        const task = new Task(req.body);
        await task.save();
        res.json({task});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error")
    }
}