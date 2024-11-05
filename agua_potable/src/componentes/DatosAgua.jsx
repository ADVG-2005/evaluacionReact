import React, { useState } from 'react'

export const DatosAgua = () => {
    const [pruebas, setPruebas] = useState(() => {
        return JSON.parse(localStorage.getItem('pruebas')) || [];
      });
      
      const [entradas, setEntradas] = useState({
        turbidez: '',
        nitratos: '',
        fluoruros: '',
        arsenico: '',
        mercurio: '',
        plomo: '',
      });
      const [alertas, setAlertas] = useState([]);
      const [resultados, setResultados] = useState([]);
    
      const manejarCambio = (e) => {
        const { name, value } = e.target;
        setEntradas({
          ...entradas,
          [name]: value,
        });
      };
    
      const verificarValores = (prueba) => {
        const nuevasAlertas = [];
        const nuevosResultados = {
          turbidez: prueba.turbidez < 1 ? prueba.turbidez : 1,
          nitratos: prueba.nitratos <= 10 ? prueba.nitratos : 10,
          fluoruros: prueba.fluoruros <= 1.5 ? prueba.fluoruros : 1.5,
          arsenico: prueba.arsenico <= 0.01 ? prueba.arsenico : 0.01,
          mercurio: prueba.mercurio <= 0.006 ? prueba.mercurio : 0.006,
          plomo: prueba.plomo <= 0.01 ? prueba.plomo : 0.01,
        };
    
        if (prueba.turbidez >= 1) nuevasAlertas.push('Turbidez fuera de rango');
        if (prueba.nitratos > 10) nuevasAlertas.push('Nitratos fuera de rango');
        if (prueba.fluoruros > 1.5) nuevasAlertas.push('Fluoruros fuera de rango');
        if (prueba.arsenico > 0.01) nuevasAlertas.push('Arsénico fuera de rango');
        if (prueba.mercurio > 0.006) nuevasAlertas.push('Mercurio fuera de rango');
        if (prueba.plomo > 0.01) nuevasAlertas.push('Plomo fuera de rango');
    
        return { nuevasAlertas, nuevosResultados };
      };
    
      const manejarEnvio = (e) => {
        e.preventDefault();
        const nuevaPrueba = {
          turbidez: parseFloat(entradas.turbidez),
          nitratos: parseFloat(entradas.nitratos),
          fluoruros: parseFloat(entradas.fluoruros),
          arsenico: parseFloat(entradas.arsenico),
          mercurio: parseFloat(entradas.mercurio),
          plomo: parseFloat(entradas.plomo),
        };
    
        const { nuevasAlertas, nuevosResultados } = verificarValores(nuevaPrueba);
        setAlertas((prev) => [...prev, ...nuevasAlertas]);
        setResultados((prev) => [
          ...prev,
          {
            ...nuevaPrueba,
            ...nuevosResultados,
          },
        ]);
    
        if (pruebas.length < 5) {
          const nuevasPruebas = [...pruebas, nuevaPrueba];
          setPruebas(nuevasPruebas);
          localStorage.setItem('pruebas', JSON.stringify(nuevasPruebas));
        }
    
        setEntradas({
          turbidez: '',
          nitratos: '',
          fluoruros: '',
          arsenico: '',
          mercurio: '',
          plomo: '',
        });
      }
  return (
<div className="container mt-5">
      <h1 className="text-center">Control de Calidad del Agua</h1>
      <form onSubmit={manejarEnvio} className="mb-4">
        <div className="mb-3">
          <input
            type="number"
            name="turbidez"
            className="form-control"
            value={entradas.turbidez}
            onChange={manejarCambio}
            placeholder="Turbidez (NTU)"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="nitratos"
            className="form-control"
            value={entradas.nitratos}
            onChange={manejarCambio}
            placeholder="Nitratos (mg/L)"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="fluoruros"
            className="form-control"
            value={entradas.fluoruros}
            onChange={manejarCambio}
            placeholder="Fluoruros (mg/L)"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="arsenico"
            className="form-control"
            value={entradas.arsenico}
            onChange={manejarCambio}
            placeholder="Arsénico (mg/L)"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="mercurio"
            className="form-control"
            value={entradas.mercurio}
            onChange={manejarCambio}
            placeholder="Mercurio (mg/L)"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="plomo"
            className="form-control"
            value={entradas.plomo}
            onChange={manejarCambio}
            placeholder="Plomo (mg/L)"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Prueba</button>
      </form>

      {alertas.length > 0 && (
        <div className="alert alert-danger">
          <h2>Alertas</h2>
          <ul>
            {alertas.map((alerta, index) => (
              <li key={index}>{alerta}</li>
            ))}
          </ul>
        </div>
      )}

      {resultados.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Elemento</th>
              <th>Valor ingresado</th>
              <th>Valor que sale</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((resultado, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>Turbidez</td>
                  <td>{resultado.turbidez}</td>
                  <td>{resultado.turbidez < 1 ? resultado.turbidez : 1}</td>
                </tr>
                <tr>
                  <td>Nitratos</td>
                  <td>{resultado.nitratos}</td>
                  <td>{resultado.nitratos <= 10 ? resultado.nitratos : 10}</td>
                </tr>
                <tr>
                  <td>Fluoruros</td>
                  <td>{resultado.fluoruros}</td>
                  <td>{resultado.fluoruros <= 1.5 ? resultado.fluoruros : 1.5}</td>
                </tr>
                <tr>
                  <td>Arsénico</td>
                  <td>{resultado.arsenico}</td>
                  <td>{resultado.arsenico <= 0.01 ? resultado.arsenico : 0.01}</td>
                </tr>
                <tr>
                  <td>Mercurio</td>
                  <td>{resultado.mercurio}</td>
                  <td>{resultado.mercurio <= 0.006 ? resultado.mercurio : 0.006}</td>
                </tr>
                <tr>
                  <td>Plomo</td>
                  <td>{resultado.plomo}</td>
                  <td>{resultado.plomo <= 0.01 ? resultado.plomo : 0.01}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      <h2 className="text-center">
        {resultados.length > 0 ? "El agua es potable" : "El agua no es potable"}
      </h2>
    </div>
    )
}
