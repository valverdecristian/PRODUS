import { useState } from "react";
import ListaProductos from "./ListaProductos";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useProductos } from "../../hooks/useProductos";
import categorias from "../../data/categorias.json";
import "./CategoriasContainer.css";

const CategoriasContainer = () => {
  const { productos, cargando, error } = useProductos();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");
  const [cargandoFiltro, setCargandoFiltro] = useState(false);
  const [mensajeFiltro, setMensajeFiltro] = useState("");

  const alSeleccionarCategoria = (catId, catNombre) => {
    if (catId === categoriaSeleccionada) return;

    setCargandoFiltro(true);
    setMensajeFiltro(`Buscando productos en ${catNombre}...`);

    setTimeout(() => {
      setCategoriaSeleccionada(catId);
      setCargandoFiltro(false);
    }, 600);
  };

  if (cargando) {
    return <LoadingSpinner mensaje="Cargando productos y categorías..." />;
  }

  if (error) {
    return (
      <div className="catalog-container">
        <h2>Categorías</h2>
        <p className="error-message">Error al cargar productos: {error}</p>
      </div>
    );
  }

  const productosFiltrados = categoriaSeleccionada === "todas"
    ? productos
    : productos.filter((p) => p.categoria === categoriaSeleccionada);

  return (
    <section className="catalog-container">
      <h2>Filtrar por Categoría</h2>
      
      <div className="categories-wrapper">
        <button
          className={`badge-categoria ${categoriaSeleccionada === "todas" ? "active" : ""}`}
          onClick={() => alSeleccionarCategoria("todas", "Todas las categorías")}
          disabled={cargandoFiltro}
        >
          Todas
        </button>
        {categorias.map((cat) => (
          <button
            key={cat.id}
            className={`badge-categoria ${categoriaSeleccionada === cat.id ? "active" : ""}`}
            onClick={() => alSeleccionarCategoria(cat.id, cat.nombre)}
            disabled={cargandoFiltro}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      {cargandoFiltro ? (
        <LoadingSpinner size="120px" mensaje={mensajeFiltro} />
      ) : productosFiltrados.length === 0 ? (
        <p className="no-products-msg">
          No hay productos registrados en esta categoría.
        </p>
      ) : (
        <div>
          <ListaProductos productos={productosFiltrados} />
        </div>
      )}
    </section>
  );
};

export default CategoriasContainer;
