import React from 'react'

const Project = ({project}) => {
    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
            >
                {project.nombre}
            </button>
        </li>
     );
}
 
export default Project;