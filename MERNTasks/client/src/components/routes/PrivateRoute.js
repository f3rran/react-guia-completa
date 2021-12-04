import React, {useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/authentication/authContext';

const PrivateRoute = ({component: Component, ...props}) => {

    const AuthContext = useContext(authContext);
    const { autenticado, userAuthenticated, loading} = AuthContext;

    useEffect(() => {
        userAuthenticated();
    }, [])
    return ( 
        <Route {...props} render={ props => !autenticado && !loading ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) }

        />
     );
}
 
export default PrivateRoute;