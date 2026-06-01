import { useParams } from 'react-router-dom';
import ContadorProducto from './ContadorProducto';
import BotonFavorito from '../ui/BotonFavorito';
import { useProducto } from '../../hooks/useProducto';
import './ProductoDetalle.css';
import categorias from '../../data/categorias.json';

const ProductoDetalle = () => {
  const { id } = useParams();
  const { producto, cargando, error } = useProducto(id);

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
            <BotonFavorito />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductoDetalle;
