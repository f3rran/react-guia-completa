import React, {useReducer} from 'react'
import TaskContext from './taskContext';
import taskReducer from './taskReducer';
import {v4 as uuid} from 'uuid';

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA 
} from '../../types';

const TaskState = props => {
    const initialState = {
        tasks: [
            {id: 1, nombre: 'Elegir Plataforma', state: true, projectId: 1},
            {id: 2, nombre: 'Elegir colores', state: false, projectId: 2},
            {id: 3, nombre: 'Elegir pasarela de pago', state: false, projectId: 3},
            {id: 4, nombre: 'Elegir hosting', state: true, projectId: 4},
            {id: 5, nombre: 'Elegir Plataforma', state: true, projectId: 1},
            {id: 6, nombre: 'Elegir colores', state: false, projectId: 3},
            {id: 7, nombre: 'Elegir pasarela de pago', state: false, projectId: 2},
            {id: 8, nombre: 'Elegir Plataforma', state: true, projectId: 2},
            {id: 9, nombre: 'Elegir colores', state: false, projectId: 1},
            {id: 10, nombre: 'Elegir pasarela de pago', state: false, projectId:2 },
        ],
        projectTasks: null,
        errorTask: false,
        selectedTask: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(taskReducer, initialState);

    //Crear las funciones

    //OBtener las tareas de un proyecto
    const getTasks = projectId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: projectId
        })
    }

    //Agregar tarea al proyecto seleccionado
    const  addTask = task => {
        task.id = uuid();
        dispatch({
            type: AGREGAR_TAREA,
            payload: task
        })
    }

    //Valida y muestra un error en caso de ser necesario
    const validateTask = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por ID
    const destroyTask = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    //Cambiar estado tarea
    const changeTaskState = task => {
        dispatch({
            type: ESTADO_TAREA,
            payload: task
        })
    }

    //Extraer tarea para edición
    const saveCurrentTask = task => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: task
        })
    }

    //Editar tarea
    const updateTask = task => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: task
        })
    }

    return (
        <TaskContext.Provider
            value={
                {
                    tasks: state.tasks,
                    projectTasks: state.projectTasks,
                    errorTask: state.errorTask,
                    selectedTask: state.selectedTask,

                    getTasks,
                    addTask,
                    validateTask,
                    destroyTask,
                    changeTaskState,
                    saveCurrentTask,
                    updateTask,
                }
            }
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;