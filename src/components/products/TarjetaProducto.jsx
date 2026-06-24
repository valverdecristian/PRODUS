import styles from './TarjetaProducto.module.css';
import ContadorProducto from './ContadorProducto';
import BotonFavorito from '../ui/BotonFavorito';
import { Link } from 'react-router-dom';
import categorias from '../../data/categorias.json';
import { generarSlug } from '../../utils/slug';

const TarjetaProducto = ({ id, imagen, nombre, precio, stock, categoria }) => {
  const nombreCategoria = categoria 
    ? (categorias.find(c => c.id === categoria)?.nombre || 'Sin Categoría') 
    : null;

  return (
    <div className={`${styles.card} w-100`}>
      <Link to={`/producto/${id}/${generarSlug(nombre)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={styles.imageContainer}>
          <img src={imagen} alt={nombre} className={styles.image} />
          <div className={styles.favoriteButton}>
            <BotonFavorito />
          </div>
        </div>
        <div className={styles.info} style={{ paddingBottom: 0 }}>
          {nombreCategoria && (
            <span className={styles.categoriaBadge}>{nombreCategoria}</span>
          )}
          <h3 className={styles.nombre}>{nombre}</h3>
          <p className={styles.precio}>${precio.toLocaleString('es-AR')}</p>
        </div>
      </Link>
      <div className={styles.info} style={{ paddingTop: 0 }}>
        <div className={styles.accionesContenedor}>
          <ContadorProducto producto={{ id, imagen, nombre, precio, stock, categoria }} />
        </div>
      </div>
    </div>
  );
};

export default TarjetaProducto;
