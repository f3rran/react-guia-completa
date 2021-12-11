import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,

    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,

    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,

    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,

} from '../types';
import clientAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos productos
export function createNewProductAction(product){
    return async (dispatch) => {
        dispatch(addProduct());

        try {
            //Insertar en la API
            await clientAxios.post('/productos', product);

            //Todo ok actualiza el state
            dispatch(addProductSuccess(product));

            //Alerta
            Swal.fire('Correcto', 'El producto se agregó correctamente', 'success');
        } catch (error) {
            console.log(error);
            dispatch(addProductError(true));

            //Alerta error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });
        }
    }
}

const addProduct = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

const addProductSuccess = (product) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: product
});

const addProductError = (flag) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: flag
});

//Get products from DB
export function getProductsAction() {
    return async (dispatch) => {
        dispatch(getProducts());

        try {
            const response = await clientAxios.get('/productos');

            dispatch(downloadProductsSuccess(response.data));
        } catch (error) {
            console.log(error);
            dispatch(downloadProductsError());
        }
    }
}

const getProducts = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const downloadProductsSuccess = (products) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: products
});

const downloadProductsError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

//Seleccionar y eliminar el producto
export function deleteProductAction(id) {
    return async (dispatch) => {
        dispatch(getProductDelete(id));

        try {
            await clientAxios.delete('/productos/'+id);
            dispatch(deleteProductSuccess());
        } catch (error) {
            console.log(error);
            dispatch(deleteProductError());
        }
    }
}

const getProductDelete = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const deleteProductSuccess = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const deleteProductError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

//Colocar producto en edición
export function getProductEdit(product)  {
    return(dispatch) => {
        dispatch(getProductAction(product));
    }
}

const getProductAction = product => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: product
});

//Editar registro en API y state
export function editProductAction(product){
    return async (dispatch) => {
        dispatch(editProduct());

        try {
            clientAxios.put('/productos/'+product.id, product);

            dispatch(editarProductoExito(product));
        } catch (error) {
            console.log(error);
        }
    }
}

const editProduct = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = (product) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: product
});