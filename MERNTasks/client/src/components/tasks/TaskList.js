import React, {Fragment, useContext} from 'react'
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const TaskList = () => {

    //Obtener proyectos del state
    const projectsContext = useContext(projectContext);
    const {project, deleteProject} = projectsContext;

    //Obtener funcion del context de tasks
    const TasksContext = useContext(TaskContext);
    const {projectTasks} = TasksContext;

    if(!project) return <h2>Seleccione un proyecto</h2>;

    // Array destructuring para extraer el proyecto actual
    const [currentProject] = project;

    return ( 
        <Fragment>
            <h2>Proyecto: {currentProject.nombre}</h2>
            <ul className="listado-tareas">
                {projectTasks.length === 0
                    ? (<li className="tarea"><p>No hay tareas ...</p> </li>)
                
                    : <TransitionGroup>
                        {projectTasks.map(tarea => (
                            <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Task 
                                    
                                    task = {tarea}
                                />
                            </CSSTransition>
                        )) }  
                      </TransitionGroup>
                }
            </ul>

            <button type="button" className="btn btn-eliminar" onClick={() => deleteProject(currentProject.id)}> Eliminar Proyecto &times; </button>
        </Fragment>
     );
}
 
export default TaskList;