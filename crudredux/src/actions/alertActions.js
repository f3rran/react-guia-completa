import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
} from '../types/index';

// Muestra una alerta
export function showAlert(alert){
    return (dispatch) => {
        dispatch(showAlertError(alert));
    }
}

const showAlertError = alert => ({
    type: MOSTRAR_ALERTA,
    payload: alert
});

//Ocultar la alerta
export function hideAlertAction() {
    return (dispatch) => {
        dispatch(hideAlertError());
    }
}

const hideAlertError = () => ({
    type: OCULTAR_ALERTA
})