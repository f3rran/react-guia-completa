import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';

const Register = () => {

    //Extraer los valores del context
    const AlertContext = useContext(alertContext);
    const {alert, showAlert} = AlertContext;

    const [usuario, guardarUsuario] = useState({
        email: '',
        password: '',
        confirmar: '',
        nombre: ''
    });

    const {email, password, confirmar, nombre} = usuario;

    const onChangeLogin = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitLogin = e => {
        e.preventDefault();

        //Validar campos vacíos
        if (nombre.trim() === '' || email.trim() === '' || password.trim() === ''  || confirmar.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //Passwords min. 6 caracteres
        if (password.length < 6) {
            showAlert('La contraseña debe contener al menos 6 caracteres', 'alerta-error');
            return;
        }

        //Passwords coinciden
        if (password !== confirmar) {
            showAlert('Las contraseñas deben coincidir', 'alerta-error');
            return;
        }

        //Pasarlo al action (reducer)
    }

    return ( 
        <div className="form-usuario">
            { alert ? (<div className={`alerta ${alert.category}`}> {alert.msg} </div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Registro</h1>

                <form
                    onSubmit={onSubmitLogin}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            placeholder="Nombre"
                            onChange={onChangeLogin}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Su email"
                            onChange={onChangeLogin}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Contraseña</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Contraseña"
                            onChange={onChangeLogin}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar contraseña</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="Repite la contraseña"
                            onChange={onChangeLogin}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarse"
                            
                        />
                    </div>
                </form>

                <Link to={'/'}
                    className="enlace-cuenta"
                > 
                    Ya tengo cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Register;