import React, { Fragment, useState, useContext} from 'react';
import projectContext from '../../context/projects/projectContext';

const NuevoProyecto = () => {

    //Obtener el state del form
    const projectsContext = useContext(projectContext);
    const {form} = projectsContext;

    //State para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //Extraer nombre de proyecto
    const {nombre} = proyecto;

    //Cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar el proyecto

        // Agregar al state

        // Reiniciar el form
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
            >
                Nuevo Proyecto
            </button>

            {
                form
                ? (
                    <form 
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input 
                            type="text" 
                            className="input-text" 
                            placeholder="Nombre proyecto" 
                            name="nombre" 
                            value={nombre}
                            onChange={onChangeProyecto}
                        />

                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block" 
                            value="Agregar proyecto"
                        />
                    </form>
                )
                : null
            }
        </Fragment>
     );
}
 
export default NuevoProyecto;