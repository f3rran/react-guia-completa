import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

//Actions de Redux
import { createNewProductAction } from '../actions/productActions';

const NewProduct = () => {

    //State del componente
    const [name, saveName] = useState('');
    const [price, savePrice] = useState(0);

    //Utilizar useDispatch y te crea una función
    const dispatch = useDispatch();

    const addProduct = product => dispatch(createNewProductAction(product));

    const submitNewProduct = e => {
        e.preventDefault();

        //Validar formulario
        if (name.trim() === '' || price <= 0) {
            return;
        }

        //Revisar errores

        //Crear el nuevo producto
        addProduct({
            name,
            price
        });

    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Añadir nuevo producto
                        </h2>

                        <form
                            onSubmit={submitNewProduct}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="name"
                                    value={name}
                                    onChange={e => saveName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="price"
                                    value={price}
                                    onChange={e => savePrice(Number(e.target.value) )}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                                Añadir
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NewProduct;