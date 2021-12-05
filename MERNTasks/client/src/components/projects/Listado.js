import React, {useContext, useEffect} from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import alertContext from '../../context/alerts/alertContext';

const ListadoProyectos = () => {

    //Obtener proyectos del state
    const projectsContext = useContext(projectContext);
    const {projects, getProjects, message} = projectsContext;

    const AlertContext = useContext(alertContext);
    const {alert, showAlert} = AlertContext;

    
    useEffect(() => {

        if (message) {
            showAlert(message.msg, message.category);
        }

        getProjects();
        // eslint-disable-next-line
    }, [message]);

    if(projects.length === 0) return <p> No hay proyectos, cree uno para empezar</p>;

    return ( 
        <ul
            className="listado-proyectos"
        >
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={250}
                        classNames="proyecto"
                    >
                        <Project
                            
                            project={project}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;