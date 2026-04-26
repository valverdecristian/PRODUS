import styles from './TarjetaProducto.module.css';
import ContadorProducto from './ContadorProducto';
import BotonFavorito from '../ui/BotonFavorito';  

const TarjetaProducto = ({ imagen, nombre, precio, stock }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imagen} alt={nombre} className={styles.image} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.precio}>${precio.toLocaleString('es-AR')}</p>
        <p className={styles.stock}>Stock disponible: {stock}</p>
        <div className={styles.accionesContenedor}>
          <ContadorProducto stock={stock} nombre={nombre} />
          <BotonFavorito />
        </div>
      </div>
    </div>
  );
};

export default TarjetaProducto;