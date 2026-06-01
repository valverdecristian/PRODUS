import { useState } from "react";
import "./FormularioProducto.css";
import categorias from "../../data/categorias.json";
import LoadingSpinner from "../ui/LoadingSpinner";

const FormularioProducto = ({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, cargando }) => {
  const [nombreArchivo, setNombreArchivo] = useState("");

  const alCambiarImagen = (evento) => {
    const file = evento.target.files[0];
    if (file) {
      setNombreArchivo(file.name);
    } else {
      setNombreArchivo("");
    }
    manejarCambioImagen(evento);
  };

  if (cargando) {
    return <LoadingSpinner mensaje="Guardando Producto..." />;
  }

  return (
    <div className="formulario-contenedor">
      <h2 className="formulario-titulo">Formulario de Producto</h2>
      <p className="formulario-subtitulo">Agregar Nuevo Producto al Catálogo</p>

      <form onSubmit={manejarEnvio}>
        <div className="form-group">
          <label className="form-label" htmlFor="nombre">Nombre del Producto:</label>
          <input
            id="nombre"
            className="form-input"
            type="text"
            placeholder="Ej: Teclado Mecánico"
            name="nombre"
            value={datosForm.nombre}
            onChange={manejarCambio}
            required
            disabled={cargando}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="precio">Precio (ARS):</label>
          <input
            id="precio"
            className="form-input"
            type="number"
            placeholder="Ej: 95"
            name="precio"
            value={datosForm.precio}
            onChange={manejarCambio}
            required
            min="0"
            step="any"
            disabled={cargando}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="stock">Stock:</label>
          <input
            id="stock"
            className="form-input"
            type="number"
            placeholder="Ej: 5"
            name="stock"
            value={datosForm.stock}
            onChange={manejarCambio}
            required
            min="0"
            disabled={cargando}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            className="form-input"
            name="categoria"
            value={datosForm.categoria}
            onChange={manejarCambio}
            required
            disabled={cargando}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Imagen del Producto:</label>
          <div className="file-input-wrapper">
            <label className="file-input-label" htmlFor="imagen-file">
              <span>{nombreArchivo ? "Cambiar Imagen" : "Seleccionar Imagen"}</span>
            </label>
            <input
              id="imagen-file"
              className="file-input-actual"
              type="file"
              accept="image/*"
              onChange={alCambiarImagen}
              disabled={cargando}
            />
          </div>
          {nombreArchivo && (
            <div className="file-name-preview">
              Archivo seleccionado: <strong>{nombreArchivo}</strong>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button className="btn-guardar" type="submit" disabled={cargando}>
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioProducto;