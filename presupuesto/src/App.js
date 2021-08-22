import {useState, useEffect} from 'react';
import Pregunta from "./components/Pregunta";
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {

  //Definir el state
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarpregunta, setPregunta] = useState(true);
  const [gastos, setgastos] = useState([]);
  const [gasto, setgasto] = useState({});
  const [crearGasto, setcrearGasto] = useState(false)

  //UseEffect que actualiza el state

  useEffect( () => {
    if (crearGasto) {

      //Agrega el nuevo presupuesto
      setgastos([
        ...gastos,
        gasto
      ]);

      //Resta del presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      guardarRestante(presupuestoRestante);

      //Resetear a false
      setcrearGasto(false);
    }
    
  }, [gasto, crearGasto, gastos, restante]);

  return (
    <div className="container">
      <header>
        <h1>Gasto semanal</h1>

        <div className="contenido-principal contenido">
          {mostrarpregunta 
          ? 
            (<Pregunta 
              guardarPresupuesto={guardarPresupuesto}
              guardarRestante={guardarRestante}
              setPregunta={setPregunta}

            />) : (
              <div className="row">
                <div className="one-half-column">
                  <Formulario
                    setgasto={setgasto}
                    setcrearGasto={setcrearGasto}
                  />
                </div>
                <div className="one-half-column">
                  <Listado 
                    gastos={gastos}
                  />

                  <ControlPresupuesto 
                      presupuesto={presupuesto}
                      restante={restante}
                  />
                </div>
              </div>
          )}
          

          
        </div>
      </header>
    </div>
  );
}

export default App;
