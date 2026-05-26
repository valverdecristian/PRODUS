import styles from './TarjetaProducto.module.css';
import ContadorProducto from './ContadorProducto';
import BotonFavorito from '../ui/BotonFavorito';
import { Link } from 'react-router-dom';

const TarjetaProducto = ({ id, imagen, nombre, precio, stock }) => {
  return (
    <div className={styles.card}>
      <Link to={`/producto/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={styles.imageContainer}>
          <img src={imagen} alt={nombre} className={styles.image} />
        </div>
        <div className={styles.info} style={{ paddingBottom: 0 }}>
          <h3 className={styles.nombre}>{nombre}</h3>
          <p className={styles.precio}>${precio.toLocaleString('es-AR')}</p>
          <p className={styles.stock}>Stock disponible: {stock}</p>
        </div>
      </Link>
      <div className={styles.info} style={{ paddingTop: 0 }}>
        <div className={styles.accionesContenedor}>
          <ContadorProducto producto={{ id, imagen, nombre, precio, stock }} />
          <BotonFavorito />
        </div>
      </div>
    </div>
  );
};

export default TarjetaProducto;