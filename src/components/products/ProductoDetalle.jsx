import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContadorProducto from './ContadorProducto';
import BotonFavorito from '../ui/BotonFavorito';
import './ProductoDetalle.css';

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/productos.json')
      .then(response => response.json())
      .then(data => {
        const productoEncontrado = data.find(p => p.id === parseInt(id));
        if (productoEncontrado) {
          setProducto(productoEncontrado);
        } else {
          setError('Producto no encontrado');
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <section className="detalle-producto">
      <div className="contenedor-detalle">
        <div className="imagen-container">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
        <div className="info-producto">
          <h1>{producto.nombre}</h1>
          <p className="precio">${producto.precio.toLocaleString('es-AR')}</p>
          <p className="stock">Stock disponible: {producto.stock}</p>
          <div className="contenedor-acciones">
            <ContadorProducto stock={producto.stock} nombre={producto.nombre} />
            <BotonFavorito />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductoDetalle;
