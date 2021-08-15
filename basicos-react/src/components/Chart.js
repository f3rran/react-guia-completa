import React from 'react'
import './chart.css'
import Producto from './Producto'

const Carrito = ({chart, setChart}) => {
    return ( 
        <div className="carrito">
            <h2>Tu carrito de compra</h2>

            {chart.length === 0
            ?
                <p>No hay elementos en el carrito</p>
            : chart.map(product => (
                <Producto
                    key={product.id}
                    product={product}
                    chart={chart}
                    setChart={setChart}
                />
            )) }
        </div>
     );
}
 
export default Carrito;