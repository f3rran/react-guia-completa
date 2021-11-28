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

//Obtener tareas por proyecto
exports.getTasks = async(req,res) => {

    //Extraer proyecto
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

        //obtener tareas por proyecto
        const tasks = await Task.find({projectId});
        res.json({tasks});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 

//Update task
exports.updateTask = async (req,res) => {
    try {

         //Extraer el proyecto y comprobar si existe
         const {projectId, name,state} = req.body;

         //Revisar si la tarea existe o no
         let existsTask = await Task.findById(req.params.id);

         if (!existsTask) {
             return res.status(404).json({msg: 'No existe esa tarea'});
         }
         
         
         const project = await Project.findById(projectId);
 
         //Revisar si el proyecto actual pertenece al usuario autenticado
         if (project.userId.toString() !== req.user.id) {
             return res.status(401).json({msg: "No autorizado"});
         }
        
         //Crear objeto con la nueva información
         const newTask = {};
         if (name) {
             newTask.name = name;
         }
         if (state) {
            newTask.state = state;
        }

        //Guardar tarea
        existsTask = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true});

        res.json({existsTask});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.deleteTask = async (req,res) => {
    try {
        //Extraer el proyecto y comprobar si existe
        const {projectId} = req.body;

        //Revisar si la tarea existe o no
        let existsTask = await Task.findById(req.params.id);

        if (!existsTask) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }
        
        
        const project = await Project.findById(projectId);

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if (project.userId.toString() !== req.user.id) {
            return res.status(401).json({msg: "No autorizado"});
        }
       
        //Eliminar
        await Task.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea eliminada'});
    } catch (error) {
        console.log(error);
    }
}