import { useContador } from '../../hooks/useContador';
import styles from './TarjetaProducto.module.css';
import { useCart } from '../../hooks/useCart';
import { useState, useEffect } from 'react';

const ContadorProducto = ({ producto, esDetalle = false }) => {
  const { cantidad, incrementar, decrementar } = useContador(producto.stock);
  const { addToCart } = useCart();
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    let timer;
    if (agregado) {
      timer = setTimeout(() => {
        setAgregado(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [agregado]);

  const agregarAlCarrito = () => {
    addToCart(producto, cantidad);
    if (esDetalle) {
      setAgregado(true);
    }
  };

  return (
    <div className={styles.accionesCart}>
      <button onClick={decrementar} disabled={cantidad === 0 || agregado} className={styles.btnCart}>-</button>
      <span className={styles.cantidad}>{cantidad}</span>
      <button onClick={incrementar} disabled={cantidad === producto.stock || agregado} className={styles.btnCart}>+</button>
      <button 
        onClick={agregarAlCarrito} 
        disabled={cantidad === 0 || agregado} 
        className={`${styles.btnAgregar} ${agregado ? styles.btnAgregado : ''}`}
      >
        {agregado ? 'Agregado al carrito' : 'Agregar Producto'}
      </button>
    </div>
  );
};

export default ContadorProducto;
