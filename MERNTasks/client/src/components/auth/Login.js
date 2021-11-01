import React, {useState} from 'react';
import {Link} from 'react-router-dom'

const Login = () => {

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

        //Pasarlo al action (reducer)
    }

    return ( 
        <div className="form-usuario">
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