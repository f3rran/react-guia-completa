import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import shortid from 'shortid';

const Formulario = ({setgasto, setcrearGasto}) => {

    const [nombregasto, setNombregasto] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [error, setError] = useState(false)

    //Cuando el suuario agrega un gasto
    const agregarGasto = e => {
        e.preventDefault();

        //Validar
        if (cantidad < 1 || isNaN(cantidad) || nombregasto.trim() === '') {
            setError(true);
            return;
        }
        setError(false);
        // Construir el gasto
        const gasto = {
            nombre: nombregasto,
            cantidad,
            id: shortid.generate()
        }

        console.log(gasto);

        //Pasar el gasto al componente principal
        setgasto(gasto);
        setcrearGasto(true);

        // Resetear el form
        setNombregasto('');
        setCantidad(0);
    }
    return ( 
        <form 
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            {error ? <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto" /> : null}

            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombregasto}
                    onChange={e => setNombregasto(e.target.value)}
                />
            </div>

            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => setCantidad(parseInt(e.target.value))}
                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
     );
}

Formulario.propTypes = {
    setgasto: PropTypes.func.isRequired,
    setcrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;