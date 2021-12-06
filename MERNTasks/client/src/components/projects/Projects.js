import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Bar from '../layout/Bar';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';
import authContext from '../../context/authentication/authContext';

const Projects = () => {

    //Extraer información de autenticación
    const AuthContext = useContext(authContext);
    const {userAuthenticated} = AuthContext;

    useEffect(() => {
        userAuthenticated();
        //eslint-disable-next-line
    }, [])

    return ( 
        <div className="contenedor-app">
            <Sidebar/>

            <div className="seccion-principal">
                <Bar/>
                <main>
                    <TaskForm />
                    <div className="contenedor-tareas">
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Projects;