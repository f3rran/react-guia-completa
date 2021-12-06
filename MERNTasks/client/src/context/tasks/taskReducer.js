import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA 
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                projectTasks: action.payload
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                projectTasks: [action.payload, ...state.projectTasks],
                errorTask: false
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errorTask: true,
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:
            return{
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? action.payload : task),
                selectedTask: null
            }
        case TAREA_ACTUAL:
            return{
                ...state,
                selectedTask: action.payload
            }
        default:
            return state;
    }
}