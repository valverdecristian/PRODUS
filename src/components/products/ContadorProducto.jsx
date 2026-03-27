import { useState } from 'react';
import styles from './TarjetaProducto.module.css';

const ContadorProducto = ({ stock, nombre }) => {
  const [cantidad, setCantidad] = useState(0);

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlCarrito = () => {
    alert(`¡Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
  };

  return (
    <div className={styles.accionesCart}>
      <button onClick={decrementar} disabled={cantidad === 0} className={styles.btnCart}>-</button>
      <span className={styles.cantidad}>{cantidad}</span>
      <button onClick={incrementar} disabled={cantidad === stock} className={styles.btnCart}>+</button>
      <button onClick={agregarAlCarrito} disabled={cantidad === 0} className={styles.btnAgregar}>
        Agregar Producto
      </button>
    </div>
  );
};

export default ContadorProducto;
