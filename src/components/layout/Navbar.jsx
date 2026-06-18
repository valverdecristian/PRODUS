import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
  const { cartCount } = useCart();
  const { showToast } = useToast();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        showToast("¡Sesión cerrada con éxito!", "success");
        navigate('/');
      })
      .catch((error) => {
        showToast("Error al cerrar sesión: " + error.message, "error");
      });
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Button text="Inicio" to="/" />
        <Button text="Productos" to="/productos" matchPrefixes={["/producto/"]} />
        <Button text="Categorías" to="/categorias" />
        {user?.rol === 'admin' && <Button text="Gestión" to="/gestion" matchPrefixes={["/agregar-producto"]} />}
        <Button icon={<FaShoppingCart />} text={cartCount > 0 ? `(${cartCount})` : ''} to="/carrito" />
        {user ? (
          <>
            <Link to="/perfil" className="user-email-badge" title="Ver mi Perfil">
              <FaUser /> Hola, {user.email.split('@')[0]}!
            </Link>
            <Button text="Salir" icon={<FaSignOutAlt />} onClick={handleLogout} />
          </>
        ) : (
          <Button text="Ingresar" icon={<FaSignInAlt />} to="/login" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
