import ListaProductos from "./ListaProductos";
import { useEffect, useState } from "react";

const ContenedorListaProductos = () => {

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://69effac5112e1b968e251cf0.mockapi.io/api/v1/productos')
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
    <div>
      <h2>Productos Destacados</h2>
      <div>
        <ListaProductos productos={productos} />
      </div>
    </div>
  )
}

export default ContenedorListaProductos;