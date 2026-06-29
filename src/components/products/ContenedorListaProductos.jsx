import { useState, useEffect } from "react";
import ListaProductos from "./ListaProductos";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useProductos } from "../../hooks/useProductos";
import { useSearch } from "../../hooks/useSearch";

const ContenedorListaProductos = () => {
  const { productos, cargando, error } = useProductos();
  const { searchTerm } = useSearch();
  const [visibleCount, setVisibleCount] = useState(9);
  
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Sync and simulate loading on search context value change
  useEffect(() => {
    setVisibleCount(9); // Reset pagination count on new search
    
    if (searchTerm) {
      setCargandoBusqueda(true);
      const timer = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
        setCargandoBusqueda(false);
      }, 400); // 400ms delay to display the spinner
      return () => clearTimeout(timer);
    } else {
      setDebouncedSearchTerm("");
      setCargandoBusqueda(false);
    }
  }, [searchTerm]);

  if (cargando) {
    return <LoadingSpinner mensaje="Cargando Lista de productos..." />;
  }

  if (cargandoBusqueda) {
    return <LoadingSpinner mensaje={`Buscando "${searchTerm}"...`} />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Filter products by name in real-time
  const productosFiltrados = productos.filter((prod) => {
    const queryLower = debouncedSearchTerm.toLowerCase().trim();
    if (!queryLower) return true;
    return prod.nombre?.toLowerCase().includes(queryLower);
  });

  const handleVerMas = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const productosVisibles = productosFiltrados.slice(0, visibleCount);

  return (
    <section className="catalog-container">
      <h2>Lista de Productos</h2>
      
      {productosFiltrados.length === 0 ? (
        <p className="no-products-msg">
          No se encontraron productos que coincidan con "{debouncedSearchTerm}".
        </p>
      ) : (
        <>
          <div>
            <ListaProductos productos={productosVisibles} />
          </div>

          {productosFiltrados.length > visibleCount && (
            <div className="d-flex justify-content-center mt-5">
              <button className="btn-ver-mas" onClick={handleVerMas}>
                Ver más
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ContenedorListaProductos;