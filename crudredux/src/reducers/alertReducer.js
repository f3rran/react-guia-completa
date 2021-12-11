import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
} from '../types/index';

// Cada reducer tiene su state
const initialState = {
    alert: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case MOSTRAR_ALERTA:
           return {
                ...state,
                alert: action.payload
           }
        case OCULTAR_ALERTA:
           return {
                ...state,
                alert: null
           }
        default:
            return state;
    }
}