import {useReducer} from 'react'
import alertReducer from './alertReducer';
import alertContext from './alertContext';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertState = props => {
    const initialState = {
        alert: null
    };

    const [state, dispatch] = useReducer(alertReducer, initialState);

    //Functions
    const showAlert = (msg, category) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                category
            }
        });

        //Después de 5s limpiar la alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    }
    return (
        <alertContext.Provider
        
           value={{
                alert: state.alert,
                showAlert
           }}
        >
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState;