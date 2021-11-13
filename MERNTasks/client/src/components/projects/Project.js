import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {

    //Obtener el state del proyecto
    const projectsContext = useContext(projectContext);
    const {currentProject} = projectsContext;

    //Obtener funcion del context de tasks
    const TasksContext = useContext(TaskContext);
    const {getTasks} = TasksContext;

    //Func para agregar el proyecto actual
    const selectProject = id => {
        currentProject(id); //Fijar proyecto actual

        getTasks(id);
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => selectProject(project.id)}
            >
                {project.nombre}
            </button>
        </li>
     );
}
 
export default Project;