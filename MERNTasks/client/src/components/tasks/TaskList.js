import React, {Fragment} from 'react'
import Task from './Task';

const TaskList = () => {

    const tareas = [
        {nombre: 'Elegir Plataforma', state: true},
        {nombre: 'Elegir colores', state: false},
        {nombre: 'Elegir pasarela de pago', state: false},
        {nombre: 'Elegir hosting', state: true},
    ];

    return ( 
        <Fragment>
            <h2>Proyecto: Tienda virtual</h2>
            <ul className="listado-tareas">
                {tareas.length === 0
                    ? (<li className="tarea"><p>No hay tareas ...</p> </li>)
                
                    : tareas.map(tarea => (
                        <Task 
                            task = {tarea}
                        />
                    ))
                }
            </ul>

            <button type="button" className="btn btn-eliminar"> Eliminar Proyecto &times; </button>
        </Fragment>
     );
}
 
export default TaskList;