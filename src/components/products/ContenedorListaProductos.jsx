import ListaProductos from "./ListaProductos";
import { useEffect, useState } from "react";

const ContenedorListaProductos = () => {

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`/data/productos.json`)
      .then(response => response.json())
      .then(data => {
        setProductos(data);
      })
      .catch(error => {
        setError(error.message);
      }).finally(() => {
        setCargando(false);
      });
  }, []);

    if (cargando) {
    return <p>Cargando productos, por favor espere...</p>;
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