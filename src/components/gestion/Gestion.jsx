import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProductos } from "../../hooks/useProductos";
import { useToast } from "../../context/ToastContext";
import LoadingSpinner from "../ui/LoadingSpinner";
import categorias from "../../data/categorias.json";
import "./Gestion.css";

const Gestion = () => {
  const { user } = useAuth();
  const { productos, cargando, error, eliminarProducto } = useProductos();
  const { showToast } = useToast();
  
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  if (!user || user.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  const obtenerNombreCategoria = (catId) => {
    if (!catId) return "Sin Categoría";
    const found = categorias.find(c => c.id.toLowerCase() === catId.toLowerCase());
    return found ? found.nombre : catId;
  };

  const abrirConfirmacion = (prod) => {
    setProductoAEliminar(prod);
  };

  const confirmarEliminar = async () => {
    if (!productoAEliminar) return;

    const { id, nombre } = productoAEliminar;
    try {
      await eliminarProducto(id);
      showToast(`Producto "${nombre}" eliminado con éxito.`, "success");
    } catch (err) {
      showToast(`Error al eliminar producto: ${err.message}`, "error");
    } finally {
      setProductoAEliminar(null);
    }
  };

  if (cargando) {
    return <LoadingSpinner mensaje="Cargando panel de gestión..." />;
  }

  if (error) {
    return (
      <div className="gestion-container">
        <h2>Gestión de Productos</h2>
        <p className="error-message">Error al cargar productos: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="gestion-container">
      <div className="gestion-header">
        <h2>Panel de Gestión de Productos</h2>
        <span className="productos-count">Total: {productos.length} productos</span>
      </div>

      <div className="table-wrapper">
        <table className="gestion-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td className="col-img">
                  <div className="thumb-container">
                    <img src={prod.imagen} alt={prod.nombre} className="gestion-thumb" />
                  </div>
                </td>
                <td className="col-nombre font-bold">{prod.nombre}</td>
                <td className="col-categoria">
                  <span className="categoria-badge">{obtenerNombreCategoria(prod.categoria)}</span>
                </td>
                <td className="col-precio">${prod.precio.toLocaleString("es-AR")}</td>
                <td className="col-stock">
                  <span className={`stock-indicator ${prod.stock === 0 ? "out-of-stock" : prod.stock < 5 ? "low-stock" : "in-stock"}`}>
                    {prod.stock}
                  </span>
                </td>
                <td className="col-acciones">
                  <button onClick={() => abrirConfirmacion(prod)} className="btn-eliminar" title="Eliminar Producto">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan="6" className="no-data">
                  No hay productos registrados en el sistema.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

    {productoAEliminar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¿Confirmar Eliminación?</h3>
            <p>
              ¿Estás seguro de que deseas eliminar permanentemente el producto{" "}
              <strong>{productoAEliminar.nombre}</strong>? Esta acción no se puede deshacer.
            </p>
            <div className="modal-actions">
              <button className="btn-cancelar" onClick={() => setProductoAEliminar(null)}>
                Cancelar
              </button>
              <button className="btn-confirmar-eliminar" onClick={confirmarEliminar}>
                Eliminar Permanente
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gestion;
