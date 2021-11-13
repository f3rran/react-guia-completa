import React, {useContext, useState, useEffect} from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';


const TaskForm = () => {

    //Extraer si un proyecto está activo
    const projectsContext = useContext(projectContext);
    const {project} = projectsContext;

    //Obtener funcion del context de tasks
    const TasksContext = useContext(TaskContext);
    const {selectedTask, errorTask, addTask, validateTask, getTasks, updateTask} = TasksContext;

    //Effect para tarea seleccionada
    useEffect(() => {
        if (selectedTask !== null) {
            saveTask(selectedTask);
        }else{
            saveTask({
                nombre: ''
            })
        }
    }, [selectedTask])

    //State del formulario
    const [task, saveTask] = useState({
        nombre: ''
    });

    //Extraer el nombre del proyecto
    const {nombre} = task;

    if(!project) return null;

    // Array destructuring para extraer el proyecto actual
    const [currentProject] = project;

    //Leer los valores del formulario
    const handleChange = e => {
        saveTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //Validar
        if (nombre.trim() === '') {
            validateTask();
            return;
        }

        // Si es edición o creación
        if(selectedTask === null){
            //Creación
            //Agregar la nueva tarea al state de tareas
            task.projectId = currentProject.id;
            task.state = false;
            addTask(task);
        }else{
            //Edición
            updateTask(task);
        }

        //Pasar la validación

        //Obtener y filtrar las tareas del proyecto actual
        getTasks(currentProject.id);

        //Reinicar form
        saveTask( {
            nombre: ''
        });
    }

    return ( 

        <div className="formulario">
            <form 
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input type="text"
                        className="input-text"
                        placeholder="Nombre tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={selectedTask ? "Editar tarea" : "Agregar tarea"}
                    />
                </div>
            </form>

            {errorTask ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default TaskForm;