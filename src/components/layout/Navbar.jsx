import { useCart } from '../../hooks/useCart';
import Button from '../ui/Button';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Button text="Inicio" to="/" />
        <Button text="Productos" to="/productos" />
        <Button text="Destacados" to="/destacados" />
        <Button text={cartCount > 0 ? `🛒 (${cartCount})` : '🛒'} to="/carrito" />
      </div>
    </nav>
  );
};

export default Navbar;