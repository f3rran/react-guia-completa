import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const Task = ({task}) => {

    //Extraer si un proyecto está activo
    const projectsContext = useContext(projectContext);
    const {project} = projectsContext;

    //Obtener funcion del context de tasks
    const TasksContext = useContext(TaskContext);
    const {destroyTask, getTasks, saveCurrentTask, updateTask} = TasksContext;

    const[currentProject] = project;

    //Función que se ejecuta al pulsar eliminar
    const taskDelete = id => {
        destroyTask(id, currentProject._id);

        getTasks(currentProject._id);
    }

    //Func modificar estado tareas
    const changeState = task => {
        if (task.state) {
            task.state = false;
        }else{
            task.state = true;
        }

        updateTask(task);
    }

    //Agregar tarea al editat
    const selectTask = task => {
        task.nombre = task.name
        saveCurrentTask(task);
    }

    return ( 
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
                {task.state ? 
                    (
                     <button
                        type="button"
                        className="completo"
                        onClick={() => changeState(task)}
                     > 
                        Completada
                     </button>    
                    )
                    :
                    (
                        <button
                        type="button"
                        className="incompleto"
                        onClick={() => changeState(task)}
                     > 
                        Incompleta
                     </button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => selectTask(task)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => taskDelete(task._id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
     );
}
 
export default Task;