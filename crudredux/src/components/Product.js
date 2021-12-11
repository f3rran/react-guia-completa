import React from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

//Redux
import {useDispatch} from 'react-redux';
import { deleteProductAction, getProductEdit } from '../actions/productActions';

const Product = ({product}) => {

    const dispatch = useDispatch();
    const history = useNavigate();//Habilitar history para redirección

    // Confirmar eliminación
    const confirmDeleteProduct = id => {

        //Preguntar al usuario
        Swal.fire({
            title: 'Eliminar producto',
            text: '¿Está seguro de que desea eliminar el producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                //Pasarlo al action
                dispatch(deleteProductAction(id));

                Swal.fire('Borrado!', 'Su producto ha sido borrado', 'success');
            }
        });
    }

    // Función para redirigir de forma programada
    const redirectEdit = product => {
        dispatch(getProductEdit(product));
        history(`/products/edit/${product.id}`);
    }

    return ( 
        <tr>
            <td>{product.name}</td>
            <td> <span className="font-weight-bold">{product.price} €</span></td>
            <td className="acciones">
                <button type="button" onClick={() => redirectEdit(product)} className="btn btn-primary mr-2">Editar</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDeleteProduct(product.id)}
                >Eliminar</button>    
            </td>
        </tr>
     );
}
 
export default Product;
