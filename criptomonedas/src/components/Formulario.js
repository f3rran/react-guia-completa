import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //State del listado de cryptos
    const [crpytos, setcrpytos] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'USD', nombre: 'Dólar estadounidense'},
        { codigo: 'MXN', nombre: 'Peso mexicano'},
        { codigo: 'GBP', nombre: 'Libra esterlina'},
    ];

    //Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', MONEDAS);

    //Utilziar useCriptomoneda
    const [criptomoneda, SelectCrypto] = useCriptomoneda('Elige tu crypto', '', crpytos);

    //Ejecutar llamada a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            setcrpytos(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    //Cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar si ambos campos están llenos
        if (moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }

        guardarError(false);
        //pasar los datos al componente principal
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Todos los campos son obligatorios'/> : null}

            <SelectMonedas />
            <SelectCrypto />

            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;