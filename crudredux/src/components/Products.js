import React, {Fragment, useEffect} from 'react';

import Product from './Product';

//Redux
import {useSelector,useDispatch} from 'react-redux';
import { getProductsAction } from '../actions/productActions';

const Products = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        //Consultar API
        const loadProducts = () => dispatch(getProductsAction())
        loadProducts();
        // eslint-disable-next-line
    }, []);

    //Get the state products
    const products = useSelector(state => state.productos.products);
    const error = useSelector(state => state.productos.error);
    const loading = useSelector(state => state.productos.loading);

    return ( 
        <Fragment>
            <h2 className="text-center my-5">Listado de productos</h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            {loading ? <p className="text-center">Cargando...</p> : null}

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { products.length === 0 ? 'No hay productos' : (
                        products.map(product => (
                            <Product
                                key={product.id}
                                product={product}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
     );
}
 
export default Products;