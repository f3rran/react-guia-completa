import React, {useContext, useEffect} from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';

const ListadoProyectos = () => {

    //Obtener proyectos del state
    const projectsContext = useContext(projectContext);
    const {projects, getProjects} = projectsContext;

    
    useEffect(() => {
        getProjects();
    }, []);

    if(projects.length === 0) return <p> No hay proyectos, cree uno para empezar</p>;

    return ( 
        <ul
            className="listado-proyectos"
        >
            {projects.map(project => (
                <Project
                    key={project.id}
                    project={project}
                />
            ))}
        </ul>
     );
}
 
export default ListadoProyectos;