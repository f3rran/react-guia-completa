import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { editProductAction } from '../actions/productActions';

const EditProduct = () => {

    //Nuevo state de producto
    const [product, saveProduct] = useState({
        name: '',
        price: 0
    });

    //Producto a editar
    const productEdit = useSelector(state => state.productos.productEdit);

    //Llenar el state automaticamente
    useEffect(() => {
        saveProduct(productEdit);
    }, [productEdit]);

    //Leer los datos del formulario
    const onChangeForm = e => {
        saveProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }

    const submitEditProduct = e => {
        e.preventDefault();

        editProductAction();
    }
    
    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar producto
                        </h2>

                        <form
                            onSubmit={submitEditProduct}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="name"
                                    value={product.name}
                                    onChange={onChangeForm}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="price"
                                    value={product.price}
                                    onChange={onChangeForm}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                                Guardar cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditProduct;