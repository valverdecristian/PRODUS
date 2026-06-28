import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ContadorProducto from './ContadorProducto';
import BotonFavorito from '../ui/BotonFavorito';
import { useProducto } from '../../hooks/useProducto';
import './ProductoDetalle.css';
import categorias from '../../data/categorias.json';

const ProductoDetalle = () => {
  const { slug } = useParams();
  const { producto, cargando, error } = useProducto(slug);

  useEffect(() => {
    if (producto && producto.nombre) {
      document.title = `${producto.nombre} | PRODUS`;
    }
    return () => {
      document.title = "Produs";
    };
  }, [producto]);

  if (cargando) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  const nombreCategoria = producto.categoria 
    ? (categorias.find(c => c.id === producto.categoria)?.nombre || 'Sin Categoría') 
    : null;

  return (
    <section className="detalle-producto">
      <title>{producto.nombre} | PRODUS</title>
      <meta name="description" content={`Compra ${producto.nombre} en PRODUS por $${producto.precio.toLocaleString('es-AR')} ARS. Categoría: ${nombreCategoria || 'General'}.`} />
      <meta name="keywords" content={`${producto.nombre}, PRODUS, tienda online, tecnologia, comprar ${producto.nombre}`} />
      
      <div className="contenedor-detalle">
        <div className="imagen-container">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
        <div className="info-producto">
          {nombreCategoria && (
            <span className="categoria-detalle">{nombreCategoria}</span>
          )}
          <h1>{producto.nombre}</h1>
          <p className="precio">${producto.precio.toLocaleString('es-AR')}</p>
          <p className="stock">Stock disponible: {producto.stock}</p>
          <div className="contenedor-acciones">
            <ContadorProducto producto={producto} esDetalle={true} />
            <BotonFavorito productoId={producto.id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductoDetalle;
