import React from 'react'

const Producto = ({product, chart, setChart, products}) => {
    const {nombre, precio, id} = product;

    //Agregar producto al carrito
    const seleccionarProducto = (id) => {
        const product = products.filter(product => product.id === id);
        setChart([
            ...chart, product
        ]);
    };

    //Elimina un producto del carrito
    const eliminarProducto = (id) => {
        const products = chart.filter(product => product.id !== id);
        
        //Colocar los productos en el state
        setChart(products);
    }
    return ( 
    
        <div>
            <h2>{nombre}</h2>
            <p>{precio}€</p>
            
            {products
            ?
                (
                    <button 
                        type="button"
                        id="comprar"
                        onClick={() => seleccionarProducto(id)}
                    >Comprar</button>
                )
            : 
                
                (
                    <button 
                        type="button"
                        id="comprar"
                        onClick={() => eliminarProducto(id)}
                    >Eliminar</button>
                )}
        </div>
    );
}
 
export default Producto;