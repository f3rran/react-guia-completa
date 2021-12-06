import React, {useReducer} from 'react'
import TaskContext from './taskContext';
import taskReducer from './taskReducer';
import clientAxios from '../../config/axios';

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA 
} from '../../types';

const TaskState = props => {
    const initialState = {
        projectTasks: [],
        errorTask: false,
        selectedTask: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(taskReducer, initialState);

    //Crear las funciones

    //OBtener las tareas de un proyecto
    const getTasks = async projectId => {
        try {
            const result = await clientAxios.get('/api/tasks', {params: {projectId}});
            console.log(result);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: result.data.tasks
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    //Agregar tarea al proyecto seleccionado
    const  addTask = async task => {
        try {
            task.name = task.nombre;
            const result = await clientAxios.post('/api/tasks', task);

            dispatch({
                type: AGREGAR_TAREA,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Valida y muestra un error en caso de ser necesario
    const validateTask = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por ID
    const destroyTask = async (id, projectId) => {
        try {
            await clientAxios.delete(`/api/tasks/${id}`, {params: {projectId}});

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Extraer tarea para edición
    const saveCurrentTask = task => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: task
        })
    }

    //Editar tarea
    const updateTask = async task => {
        task.name = task.nombre;
        try {
            const result = await clientAxios.put(`/api/tasks/${task._id}`, task);
            console.log(result);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: result.data.existsTask
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TaskContext.Provider
            value={
                {
                    projectTasks: state.projectTasks,
                    errorTask: state.errorTask,
                    selectedTask: state.selectedTask,

                    getTasks,
                    addTask,
                    validateTask,
                    destroyTask,
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