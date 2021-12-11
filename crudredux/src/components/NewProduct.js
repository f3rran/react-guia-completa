import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";

//Actions de Redux
import { createNewProductAction } from '../actions/productActions';
import { showAlert, hideAlertAction } from '../actions/alertActions';

const NewProduct = ({history}) => {

    //State del componente
    const [name, saveName] = useState('');
    const [price, savePrice] = useState(0);

    //Utilizar useDispatch y te crea una función
    const dispatch = useDispatch();

    //Acceder al state del store
    const loading = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alert = useSelector(state => state.alerts.alert);

    const addProduct = product => dispatch(createNewProductAction(product));

    let navigate = useNavigate();

    const submitNewProduct = e => {
        e.preventDefault();

        //Validar formulario
        if (name.trim() === '' || price <= 0) {

            const response = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(showAlert(response));
            return;
        }

        //Revisar errores
        dispatch(hideAlertAction());

        //Crear el nuevo producto
        addProduct({
            name,
            price
        });

        //Redireccionar a la home
        navigate("/");

    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Añadir nuevo producto
                        </h2>
                        {alert ? <p className={alert.classes}>{alert.msg}</p> : null}
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
                        {loading ? <p>Cargando...</p> : null}
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NewProduct;