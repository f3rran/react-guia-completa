import React from 'react'

const TaskForm = () => {
    return ( 

        <div className="formulario">
            <form action="">
                <div className="contenedor-input">
                    <input type="text"
                        className="input-text"
                        placeholder="Nombre tarea"
                        name="nombre"
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar tarea"
                    />
                </div>
            </form>
        </div>
     );
}
 
export default TaskForm;