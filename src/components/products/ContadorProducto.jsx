import { useContador } from '../../hooks/useContador';
import styles from './TarjetaProducto.module.css';
import { useCart } from '../../hooks/useCart';
import { useState, useEffect } from 'react';
import { FaMinus, FaPlus, FaCartPlus, FaCheck } from 'react-icons/fa';

const ContadorProducto = ({ producto, esDetalle = false }) => {
  const { cantidad, incrementar, decrementar } = useContador(producto.stock);
  const { addToCart, getCantidadActual } = useCart();
  const cantidadActual = getCantidadActual(producto.id);
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
    <div className={styles.contadorContenedor}>
      <div className={styles.accionesCart}>
        <div className={styles.selectorCantidad}>
          <button onClick={decrementar} disabled={cantidad === 0 || agregado} className={styles.btnCart} aria-label="Restar cantidad">
            <FaMinus />
          </button>
          <span className={styles.cantidad}>{cantidad}</span>
          <button onClick={incrementar} disabled={cantidad === producto.stock || agregado} className={styles.btnCart} aria-label="Sumar cantidad">
            <FaPlus />
          </button>
        </div>
        <button
          onClick={agregarAlCarrito}
          disabled={cantidad === 0 || agregado}
          className={`${styles.btnAgregar} ${agregado ? styles.btnAgregado : ''}`}
          >
          {agregado ? (
            <>
              <FaCheck /> Agregado
            </>
          ) : (
            <>
              <FaCartPlus /> Agregar
            </>
          )}
        </button>
      </div>
      {cantidadActual > 0 && (
        <div className={styles.enCarritoBadge}>
          En carrito: <strong>{cantidadActual}</strong>
        </div>
      )}
    </div>
  );
};

export default ContadorProducto;
