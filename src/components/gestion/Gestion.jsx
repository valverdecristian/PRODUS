import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProductos } from "../../hooks/useProductos";
import { useToast } from "../../context/ToastContext";
import LoadingSpinner from "../ui/LoadingSpinner";
import FormularioProducto from "../form/FormularioProducto";
import categorias from "../../data/categorias.json";
import "./Gestion.css";

const Gestion = () => {
  const { user } = useAuth();
  const { productos, cargando, error, eliminarProducto, actualizarProducto } = useProductos();
  const { showToast } = useToast();
  
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: ""
  });
  const [imagenFile, setImagenFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [cargandoEdicion, setCargandoEdicion] = useState(false);

  useEffect(() => {
    if (!imagenFile) {
      if (productoAEditar) {
        setPreviewUrl(productoAEditar.imagen);
      } else {
        setPreviewUrl("");
      }
      return;
    }
    const objectUrl = URL.createObjectURL(imagenFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imagenFile, productoAEditar]);

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

  const abrirEditar = (prod) => {
    setProductoAEditar(prod);
    setDatosForm({
      nombre: prod.nombre,
      precio: prod.precio.toString(),
      stock: prod.stock.toString(),
      categoria: prod.categoria
    });
    setImagenFile(null);
    setPreviewUrl(prod.imagen);
  };

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarCambioImagen = (evento) => {
    setImagenFile(evento.target.files[0] || null);
  };

  const manejarEnvioEdicion = async (evento) => {
    evento.preventDefault();
    if (!productoAEditar) return;

    if (!datosForm.nombre || !datosForm.precio || !datosForm.stock || !datosForm.categoria) {
      showToast("Por favor, completa todos los campos del producto.", "error");
      return;
    }

    setCargandoEdicion(true);

    try {
      let urlImagen = productoAEditar.imagen;

      if (imagenFile) {
        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
        if (!apiKey) {
          throw new Error("La clave API de Imgbb (VITE_IMGBB_API_KEY) no está configurada en las variables de entorno.");
        }

        const formData = new FormData();
        formData.append('image', imagenFile);

        console.log("Subiendo nueva imagen a Imgbb...");
        const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: formData
        });

        const datosImgbb = await respuestaImgbb.json();
        if (!datosImgbb.success) {
          throw new Error(datosImgbb.error?.message || "Error desconocido al subir la imagen a Imgbb");
        }

        urlImagen = datosImgbb.data.url;
        console.log("Nueva imagen subida con éxito. URL:", urlImagen);
      }

      const productoActualizado = {
        nombre: datosForm.nombre,
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
        imagen: urlImagen,
        categoria: datosForm.categoria
      };

      await actualizarProducto(productoAEditar.id, productoActualizado);
      showToast(`¡Producto "${datosForm.nombre}" actualizado con éxito!`, "success");
      setProductoAEditar(null);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      showToast(`Hubo un error al guardar los cambios: ${error.message}`, "error");
    } finally {
      setCargandoEdicion(false);
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
                  <div className="acciones-buttons">
                    <button onClick={() => abrirEditar(prod)} className="btn-editar" title="Editar Producto">
                      Editar
                    </button>
                    <button onClick={() => abrirConfirmacion(prod)} className="btn-eliminar" title="Eliminar Producto">
                      Eliminar
                    </button>
                  </div>
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
                🗑️ Eliminar Permanente
              </button>
            </div>
          </div>
        </div>
      )}

      {productoAEditar && (
        <div className="modal-overlay">
          <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvioEdicion}
            manejarCambioImagen={manejarCambioImagen}
            cargando={cargandoEdicion}
            previewUrl={previewUrl}
            titulo="Editar Producto"
            subtitulo={`Modificando la información de: ${productoAEditar.nombre}`}
            textoBoton="Guardar Cambios"
            onCancelar={() => setProductoAEditar(null)}
          />
        </div>
      )}
    </>
  );
};

export default Gestion;
