import React, {Fragment, useState} from 'react';
import Header from './components/Header';
import Footer from './components/Footer'
import Producto from './components/Producto'
import Chart from './components/Chart'

function App() {

  //Crear listado de productos
  const [ products, setProducts ] = useState([
    {id: 1, nombre: 'Camisa ReactJS', precio:50 },
    {id: 2, nombre: 'Camisa VueJS', precio:40 },
    {id: 3, nombre: 'Camisa AngularJS', precio:30 },
    {id: 4, nombre: 'Camisa NodeJS', precio:20 },
  ]);
  
  // State para un carrito de compras
  const [chart, setChart] = useState([]);

  //Obtener fecha
  const fecha = new Date().getFullYear();
  
  return (
    <Fragment>
      <Header
        titulo="Tienda virtual Prop"
      />

      <h1>Lista de Productos</h1>
      {products.map(product => (
        <Producto
          key={product.id}
          product={product}
          chart={chart}
          setChart={setChart}
          products={products}
        />
      ))}

      <Chart
        chart={chart}
        setChart={setChart}
      />
      <Footer
        fecha={fecha}
      />
    </Fragment>
  );
}

export default App;
