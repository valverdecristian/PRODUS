import { useState } from "react";
import "./FormularioProducto.css";
import categorias from "../../data/categorias.json";
import LoadingSpinner from "../ui/LoadingSpinner";

const FormularioProducto = ({ 
  datosForm, 
  manejarCambio, 
  manejarEnvio, 
  manejarCambioImagen, 
  cargando,
  previewUrl,
  titulo = "Formulario de Producto",
  subtitulo = "Agregar Nuevo Producto al Catálogo",
  textoBoton = "Guardar Producto",
  onCancelar
}) => {
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
      <h2 className="formulario-titulo">{titulo}</h2>
      <p className="formulario-subtitulo">{subtitulo}</p>

      <form onSubmit={manejarEnvio} className="formulario-grid">
        <div className="form-columna-inputs">
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
            <div className="form-label-container">
              <label className="form-label" htmlFor="descripcion">Descripción:</label>
              <span className={`char-counter ${(datosForm.descripcion || "").length >= 300 ? "limite-alcanzado" : ""}`}>
                {(datosForm.descripcion || "").length}/300
              </span>
            </div>
            <textarea
              id="descripcion"
              className="form-input form-textarea"
              placeholder="Ej: Teclado mecánico retroiluminado con interruptores táctiles silenciosos..."
              name="descripcion"
              value={datosForm.descripcion || ""}
              onChange={manejarCambio}
              maxLength={300}
              disabled={cargando}
            />
          </div>
        </div>

        <div className="form-columna-media">
          <div className="form-group">
            <label className="form-label">Imagen del Producto:</label>
            {previewUrl && (
              <div className="image-preview-container">
                <img src={previewUrl} alt="Vista previa del producto" className="image-preview" />
              </div>
            )}
            <div className="file-input-wrapper">
              <label className="file-input-label" htmlFor="imagen-file">
                <span>{nombreArchivo || previewUrl ? "Cambiar Imagen" : "Seleccionar Imagen"}</span>
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
            {onCancelar && (
              <button className="btn-cancelar" type="button" onClick={onCancelar} disabled={cargando}>
                Cancelar
              </button>
            )}
            <button className="btn-guardar" type="submit" disabled={cargando}>
              {textoBoton}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioProducto;