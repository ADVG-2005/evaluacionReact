import React, { useState } from 'react'

export const Actividades = () => {

    const [actividades, setActividades] = useState(
        JSON.parse(localStorage.getItem('actividades')) || []
      );
      const [actividadSeleccionada, setActividadSeleccionada] = useState('');
      const [minutos, setMinutos] = useState('');
    
      const [egresos, setEgresos] = useState(
        JSON.parse(localStorage.getItem('egresos')) || []
      );
      const [actividadEgreso, setActividadEgreso] = useState('');
      const [costo, setCosto] = useState('');
    
      const [ventas, setVentas] = useState(
        JSON.parse(localStorage.getItem('ventas')) || []
      );
      const [productoSeleccionado, setProductoSeleccionado] = useState('');
      const [precio, setPrecio] = useState('');
    
      const opcionesActividades = [
        'Aseo de instalaciones',
        'Alimentación',
        'Control sanitario',
        'Manejo general',
        'Ordeño',
        'Adecuaciones locativas',
        'Otras'
      ];
    
      const opcionesProductos = [
        'Leche',
        'Huevos',
        'Carne',
        'Crias',
        'Queso',
        'Yogurth',
        'Cuajada',
        'Chorizo'
      ];
    
      const actualizarLocalStorage = (clave, datos) => {
        localStorage.setItem(clave, JSON.stringify(datos));
      };
    
      const agregarActividad = () => {
        if (actividadSeleccionada && minutos) {
          const nuevasActividades = [
            ...actividades,
            { actividad: actividadSeleccionada, minutos: parseInt(minutos) }
          ];
          setActividades(nuevasActividades);
          actualizarLocalStorage('actividades', nuevasActividades);
          setActividadSeleccionada('');
          setMinutos('');
        }
      };
    
      const agregarEgreso = () => {
        if (actividadEgreso && costo) {
          const nuevosEgresos = [
            ...egresos,
            { actividad: actividadEgreso, costo: parseFloat(costo) }
          ];
          setEgresos(nuevosEgresos);
          actualizarLocalStorage('egresos', nuevosEgresos);
          setActividadEgreso('');
          setCosto('');
        }
      };
    
      const agregarVenta = () => {
        if (productoSeleccionado && precio) {
          const nuevasVentas = [
            ...ventas,
            { producto: productoSeleccionado, precio: parseFloat(precio) }
          ];
          setVentas(nuevasVentas);
          actualizarLocalStorage('ventas', nuevasVentas);
          setProductoSeleccionado('');
          setPrecio('');
        }
      };
    
      const totalMinutos = actividades.reduce((acc, curr) => acc + curr.minutos, 0);
      const totalEgresos = egresos.reduce((acc, curr) => acc + curr.costo, 0);
      const totalIngresos = ventas.reduce((acc, curr) => acc + curr.precio, 0);
      const rentabilidad = totalIngresos - totalEgresos;
  return (
    <div className="container mt-5">
      <h1>Registro de Actividades y Rentabilidad</h1>

      <section className="mb-4">
        <h2>Registro de Actividades</h2>
        <select
          className="form-control mb-2"
          value={actividadSeleccionada}
          onChange={(e) => setActividadSeleccionada(e.target.value)}
        >
          <option value="">Selecciona una actividad</option>
          {opcionesActividades.map((actividad, index) => (
            <option key={index} value={actividad}>{actividad}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Minutos trabajados"
          className="form-control mb-2"
          value={minutos}
          onChange={(e) => setMinutos(e.target.value)}
        />
        <button className="btn btn-primary mb-3" onClick={agregarActividad}>
          Agregar Actividad
        </button>
        <ul className="list-group">
          {actividades.map((act, index) => (
            <li key={index} className="list-group-item">
              {act.actividad}: {act.minutos} minutos
            </li>
          ))}
        </ul>
        <p><strong>Tiempo total trabajado:</strong> {totalMinutos} minutos</p>
      </section>

      <section className="mb-4">
        <h2>Registro de Egresos</h2>
        <select
          className="form-control mb-2"
          value={actividadEgreso}
          onChange={(e) => setActividadEgreso(e.target.value)}
        >
          <option value="">Selecciona una actividad</option>
          {opcionesActividades.map((actividad, index) => (
            <option key={index} value={actividad}>{actividad}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Costo"
          className="form-control mb-2"
          value={costo}
          onChange={(e) => setCosto(e.target.value)}
        />
        <button className="btn btn-danger mb-3" onClick={agregarEgreso}>
          Agregar Egreso
        </button>
        <ul className="list-group">
          {egresos.map((egreso, index) => (
            <li key={index} className="list-group-item">
              {egreso.actividad}: ${egreso.costo.toFixed(2)}
            </li>
          ))}
        </ul>
        <p><strong>Total Egresos:</strong> ${totalEgresos.toFixed(2)}</p>
      </section>

      <section className="mb-4">
        <h2>Registro de Ventas</h2>
        <select
          className="form-control mb-2"
          value={productoSeleccionado}
          onChange={(e) => setProductoSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un producto</option>
          {opcionesProductos.map((producto, index) => (
            <option key={index} value={producto}>{producto}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Precio"
          className="form-control mb-2"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <button className="btn btn-success mb-3" onClick={agregarVenta}>
          Agregar Venta
        </button>
        <ul className="list-group">
          {ventas.map((venta, index) => (
            <li key={index} className="list-group-item">
              {venta.producto}: ${venta.precio.toFixed(2)}
            </li>
          ))}
        </ul>
        <p><strong>Total Ingresos:</strong> ${totalIngresos.toFixed(2)}</p>
      </section>

      <section className="mt-4">
        <h2>Rentabilidad</h2>
        <p><strong>Rentabilidad Total:</strong> ${rentabilidad.toFixed(2)}</p>
        {rentabilidad >= 0 ? (
          <p className="text-success">¡Hay rentabilidad!</p>
        ) : (
          <p className="text-danger">No hay rentabilidad</p>
        )}
      </section>
    </div>
  )
}
