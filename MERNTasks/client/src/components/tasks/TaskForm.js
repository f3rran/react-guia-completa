import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';


const TaskForm = () => {

    //Extraer si un proyecto está activo
    const projectsContext = useContext(projectContext);
    const {project} = projectsContext;

    if(!project) return null;

    // Array destructuring para extraer el proyecto actual
    const [currentProject] = project;

    return ( 

        <div className="formulario">
            <form action="">
                <div className="contenedor-input">
                    <input type="text"
                        className="input-text"
                        placeholder="Nombre tarea"
                        name="nombre"
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar tarea"
                    />
                </div>
            </form>
        </div>
     );
}
 
export default TaskForm;