import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import './Carrito.css';

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { showToast } = useToast();

  const handleSimularCompra = () => {
    showToast('¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.', 'success');
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty-container">
        <div className="cart-empty-card">
          <div className="cart-empty-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Explora nuestro catálogo y agrega los mejores productos tecnológicos a tu carrito.</p>
          <Link to="/productos" className="btn-return-shop">
            Volver a Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h2>Tu Carrito de Compras</h2>
      
      <div className="cart-layout">
        {/* Lista de productos */}
        <div className="cart-items-section">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-image-wrapper">
                <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
              </div>
              
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.nombre}</h3>
                <span className="cart-item-price-unit">${item.precio.toLocaleString('es-AR')} c/u</span>
              </div>

              <div className="cart-item-quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.cantidad - 1)} 
                  disabled={item.cantidad <= 1}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty-value">{item.cantidad}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                  disabled={item.cantidad >= item.stock}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <div className="cart-item-subtotal">
                <span className="subtotal-label">Subtotal</span>
                <span className="subtotal-value">${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)} 
                className="cart-item-delete"
                title="Eliminar producto"
              >
                ✕
              </button>
            </div>
          ))}

          <div className="cart-actions-bottom">
            <button onClick={clearCart} className="btn-clear-cart">
              Vaciar Carrito
            </button>
            <Link to="/productos" className="btn-continue-shopping">
              Seguir Comprando
            </Link>
          </div>
        </div>

        {/* Resumen de Compra */}
        <div className="cart-summary-section">
          <div className="cart-summary-card">
            <h2>Resumen del Pedido</h2>
            <hr />
            <div className="summary-row">
              <span>Productos ({cart.reduce((sum, i) => sum + i.cantidad, 0)})</span>
              <span>${cartTotal.toLocaleString('es-AR')}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span className="free-shipping">¡Gratis!</span>
            </div>
            <hr />
            <div className="summary-row total-row">
              <span>Total</span>
              <span className="total-value">${cartTotal.toLocaleString('es-AR')}</span>
            </div>
            <button onClick={handleSimularCompra} className="btn-checkout">
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
