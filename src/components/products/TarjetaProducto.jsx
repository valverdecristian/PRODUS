import styles from './TarjetaProducto.module.css';

const TarjetaProducto = ({ imagen, nombre, precio }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imagen} alt={nombre} className={styles.image} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.precio}>${precio.toLocaleString('es-AR')}</p>
      </div>
    </div>
  );
};

export default TarjetaProducto;