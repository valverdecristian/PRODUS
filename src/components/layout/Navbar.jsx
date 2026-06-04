import { useCart } from '../../hooks/useCart';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
  const { cartCount } = useCart();
  const { showToast } = useToast();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout()
      .then(() => {
        showToast("¡Sesión cerrada con éxito!", "success");
      })
      .catch((error) => {
        showToast("Error al cerrar sesión: " + error.message, "error");
      });
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Button text="Inicio" to="/" />
        <Button text="Productos" to="/productos" />
        <Button text="Categorías" to="/categorias" />
        {user?.rol === 'admin' && <Button text="Gestión" to="/gestion" />}
        {user?.rol === 'admin' && <Button text="+" to="/agregar-producto" />}
        <Button text={cartCount > 0 ? `🛒 (${cartCount})` : '🛒'} to="/carrito" />
        {user ? (
          <>
            <span className="user-email-badge" title={user.email}>
              Hola, {user.email.split('@')[0]}!
            </span>
            <Button text="Salir" onClick={handleLogout} />
          </>
        ) : (
          <Button text="Ingresar" to="/login" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
