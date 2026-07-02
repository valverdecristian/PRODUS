import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { FaCheckCircle, FaShoppingCart, FaTimes } from 'react-icons/fa';
import './ModalAgregarCarrito.css';

const ModalAgregarCarrito = () => {
  const { modalInfo, closeModal } = useCart();
  const { isOpen, product, quantity } = modalInfo;

  // Escuchar la tecla Escape y bloquear scroll del body
  useEffect(() => {
    const alPresionarTecla = (evento) => {
      if (evento.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', alPresionarTecla);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', alPresionarTecla);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeModal]);

  // Si el usuario no responde al modal, se cierra automáticamente.
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      closeModal();
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen, closeModal]);

  if (!isOpen || !product) return null;

  const totalItem = product.precio * quantity;

  return (
    <div className="cart-modal-overlay" onClick={closeModal}>
      <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="cart-modal-close" onClick={closeModal} aria-label="Cerrar modal">
          <FaTimes />
        </button>
        <div className="cart-modal-header">
          <div className="success-icon-wrapper">
            <FaCheckCircle className="success-icon" />
          </div>
          <h3>¡Producto agregado!</h3>
        </div>

        <div className="cart-modal-body">
          <div className="cart-modal-product-details">
            <div className="cart-modal-product-img">
              <img src={product.imagen} alt={product.nombre} />
            </div>
            <div className="cart-modal-product-info">
              <h4 className="cart-modal-product-name">{product.nombre}</h4>
              <div className="cart-modal-product-meta">
                <span className="meta-item">Precio: <strong>${product.precio.toLocaleString('es-AR')}</strong></span>
                <span className="meta-item">Cantidad: <strong>{quantity}</strong></span>
              </div>
              <div className="cart-modal-product-subtotal">
                Subtotal: <strong>${totalItem.toLocaleString('es-AR')}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="cart-modal-actions">
          <button className="btn-seguir-comprando" onClick={closeModal}>
            Seguir comprando
          </button>
          <Link to="/carrito" className="btn-ver-carrito" onClick={closeModal}>
            <FaShoppingCart /> Ver en carrito
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarCarrito;
