import React from 'react'

const Error = ({mensaje}) =>  ( 
    <p className="alert alert-danger error"> {mensaje ? mensaje : "Hubo un error"}</p>
 );
 
export default Error;