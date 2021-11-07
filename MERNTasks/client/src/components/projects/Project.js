import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';

const Project = ({project}) => {

    //Obtener el state del proyecto
    const projectsContext = useContext(projectContext);
    const {currentProject} = projectsContext;

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => currentProject(project.id)}
            >
                {project.nombre}
            </button>
        </li>
     );
}
 
export default Project;