import React, {useState} from 'react';
import {Link} from 'react-router-dom'

const Register = () => {

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

        //Passwords min. 6 caracteres

        //Passwords coinciden

        //Pasarlo al action (reducer)
    }

    return ( 
        <div className="form-usuario">
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