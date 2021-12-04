import React, {useContext, useEffect} from 'react';
import authContext from '../../context/authentication/authContext';

const Bar = () => {

    //Extraer información de autenticación
    const AuthContext = useContext(authContext);
    const {userAuthenticated, user, logOut} = AuthContext;

    useEffect(() => {
        userAuthenticated();
    }, []);

    return ( 
        <header className="app-header">
            {user ? <p className="nombre-usuario">
                Hola, <span>{user.name}</span>
            </p> : null}
            
            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    style={{color: 'white'}}
                    onClick={() => logOut()}
                > Cerrar sesión </button>
            </nav>
        </header>
     );
}
 
export default Bar;