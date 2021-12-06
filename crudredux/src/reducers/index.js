import {combineReducers} from 'redux';
import productsReducer from './productsReducer';

export default combineReducers({
    productos: productsReducer
})