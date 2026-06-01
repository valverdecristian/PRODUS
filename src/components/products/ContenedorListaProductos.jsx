import ListaProductos from "./ListaProductos";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useProductos } from "../../hooks/useProductos";

const ContenedorListaProductos = () => {
  const { productos, cargando, error } = useProductos();

  if (cargando) {
    return <LoadingSpinner mensaje="Cargando Lista de productos..." />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="catalog-container">
      <h2>Lista de Productos</h2>
      <div>
        <ListaProductos productos={productos} />
      </div>
    </section>
  )
}

export default ContenedorListaProductos;