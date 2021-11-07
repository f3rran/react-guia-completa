import React, {useReducer} from 'react';
import { v4 as uuid } from 'uuid';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { FORMULARIO_PROYECTO, GET_PROJECTS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from '../../types';

const ProjectState = props => {
    const projects = [
        {id: 1, nombre: "Tienda Virtual"},
        {id: 2, nombre: "Intranet"},
        {id: 3, nombre: "Diseño de sitio web"},
    ];

    const initialState = {
        projects: [],
        form: false,
        errorform: false,
        project: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // Funciones para el CRUD
    const showForm = () => { 
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    };

    //Obtener projects
    const getProjects = () => {
        dispatch({
            type: GET_PROJECTS,
            payload: projects
        });
    };

    //Agregar nuevo proyecto
    const storeProject = project => {
        project.id = uuid();

        // Insertar el proyecto en el state
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: project
        })
    };

    //Valida el formulario por errores
    const showError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    };

    // Seleccionar proyecto click
    const currentProject = projectId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: projectId
        })
    };

    //Eliminar proyecto
    const deleteProject = projectId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: projectId
        })
    }

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                errorform: state.errorform,
                project: state.project,
                showForm,
                getProjects,
                storeProject,
                showError,
                currentProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;