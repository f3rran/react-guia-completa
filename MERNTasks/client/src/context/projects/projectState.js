import React, {useReducer} from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { FORMULARIO_PROYECTO, GET_PROJECTS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR } from '../../types';

import clientAxios from '../../config/axios';

const ProjectState = props => {

    const initialState = {
        projects: [],
        form: false,
        errorform: false,
        project: null,
        message: null
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
    const getProjects = async () => {
        try {

            const result = await clientAxios.get('/api/projects');

            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects
            });
            
        } catch (error) {
            console.log(error);
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alert
            });
        }
    };

    //Agregar nuevo proyecto
    const storeProject = async project => {
        project.name = project.nombre;
        console.log(project);
        try {
            const result = await clientAxios.post('/api/projects', project);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: result.data
            })
        } catch (error) {
            console.log(error);
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alert
            });
        }
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
    const deleteProject = async projectId => {
        try {
            await clientAxios.delete(`/api/projects/${projectId}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: projectId
            });
        } catch (error) {
            console.log(error);
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alert
            });
        }
    }

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                errorform: state.errorform,
                project: state.project,
                message: state.message,
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