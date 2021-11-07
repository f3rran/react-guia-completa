import React, { Fragment, useState, useContext} from 'react';
import projectContext from '../../context/projects/projectContext';

const NuevoProyecto = () => {

    //Obtener el state del form
    const projectsContext = useContext(projectContext);
    const {form, showForm, errorform, storeProject, showError} = projectsContext;

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
        if (nombre === '') {
            showError();
            return;
        }

        // Agregar al state
        storeProject(proyecto);

        // Reiniciar el form
        guardarProyecto({
            nombre: ''
        })
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => showForm()}
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

            { errorform ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        </Fragment>
     );
}
 
export default NuevoProyecto;