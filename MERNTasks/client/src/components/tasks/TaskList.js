import React, {Fragment, useContext} from 'react'
import Task from './Task';
import projectContext from '../../context/projects/projectContext';

const TaskList = () => {

    //Obtener proyectos del state
    const projectsContext = useContext(projectContext);
    const {project, deleteProject} = projectsContext;

    const tareas = [
        {nombre: 'Elegir Plataforma', state: true},
        {nombre: 'Elegir colores', state: false},
        {nombre: 'Elegir pasarela de pago', state: false},
        {nombre: 'Elegir hosting', state: true},
    ];

    if(!project) return <h2>Seleccione un proyecto</h2>;

    // Array destructuring para extraer el proyecto actual
    const [currentProject] = project;

    return ( 
        <Fragment>
            <h2>Proyecto: {currentProject.nombre}</h2>
            <ul className="listado-tareas">
                {tareas.length === 0
                    ? (<li className="tarea"><p>No hay tareas ...</p> </li>)
                
                    : tareas.map(tarea => (
                        <Task 
                            task = {tarea}
                        />
                    ))
                }
            </ul>

            <button type="button" className="btn btn-eliminar" onClick={() => deleteProject(currentProject.id)}> Eliminar Proyecto &times; </button>
        </Fragment>
     );
}
 
export default TaskList;