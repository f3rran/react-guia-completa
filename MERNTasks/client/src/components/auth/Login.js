import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/authentication/authContext';

const Login = (props) => {

    //Extraer los valores del context
    const AlertContext = useContext(alertContext);
    const {alert, showAlert} = AlertContext;

    const AuthContext = useContext(authContext);
    const {logIn, message, autenticado} = AuthContext;

    //En caso que el usuario o la contraseña no exista
    useEffect(() => {
        if (autenticado) {
            props.history.push('/projects');
        }

        if (message) {
            showAlert(message.msg, message.category);
        }
    }, [message, autenticado, props.history]);

    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    const {email, password} = usuario;

    const onChangeLogin = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitLogin = e => {
        e.preventDefault();

        //Validar campos vacíos
        if (email.trim() === '' || password.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alerta-error');
        }

        //Pasarlo al action (reducer)
        logIn({email, password});
    }

    return ( 
        <div className="form-usuario">
            { alert ? (<div className={`alerta ${alert.category}`}> {alert.msg} </div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesión</h1>

                <form
                    onSubmit={onSubmitLogin}
                >
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
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar sesión"
                            
                        />
                    </div>
                </form>

                <Link to={'/registro'}
                    className="enlace-cuenta"
                > 
                    Registro
                </Link>
            </div>
        </div>
     );
}
 
export default Login;