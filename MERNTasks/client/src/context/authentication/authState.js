import React, {useReducer} from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
 } from "../../types";

 const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        user: null,
        message: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    //Functions
    const registerUser = async data => {
        try {
            data.name = data.nombre;
            const response = await clientAxios.post('api/users', data);
            console.log(response.data);

            dispatch({type: REGISTRO_EXITOSO, payload: response.data});

            //Obtener usuario
            userAuthenticated();
        } catch (error) {
            //console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error',
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alert

            });
        }
    }

    //Retornar user authenticated
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            tokenAuth(token);

        }

        try {
            const response = await clientAxios.get('/api/auth');
            //console.log(response);

            dispatch({
                type: OBTENER_USUARIO,
                payload: response.data.user
            });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // Cuando el usuario inicia sesión
    const logIn = async data => {
        try {

            const response = await clientAxios.post('/api/auth', data);

            dispatch({
                type: LOGIN_EXITOSO,
                payload: response.data
            });
            
            userAuthenticated();
            
        } catch (error) {
            console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error',
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert

            });
        }
    }

    //Cerrar sesión de usuario
    const logOut = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }
    

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                user: state.user,
                message: state.message,
                loading: state.loading,

                registerUser,
                logIn,
                userAuthenticated,
                logOut
            }}
        >
            {props.children}
        </authContext.Provider>
    )
 }

 export default AuthState;