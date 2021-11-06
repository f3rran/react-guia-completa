import React from 'react';
import NuevoProyecto from '../projects/NuevoProyecto';
import ListadoProyectos from '../projects/Listado';

const Sidebar = () => {
    return ( 
        <aside>
            <h1>MERN <span>Tasks</span></h1>

            <NuevoProyecto></NuevoProyecto>

            <div className="proyectos">
                <h2>Tus proyectos</h2>

                <ListadoProyectos />
            </div>
        </aside>
     );
}
 
export default Sidebar;