import React from 'react';
import Project from './Project';

const ListadoProyectos = () => {

    const projects = [
        {nombre: "Tienda Virtual"},
        {nombre: "Intranet"},
        {nombre: "Diseño de sitio web"},
    ];

    return ( 
        <ul
            className="listado-proyectos"
        >
            {projects.map(project => (
                <Project
                    project={project}
                />
            ))}
        </ul>
     );
}
 
export default ListadoProyectos;