import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { Nav } from 'react-bootstrap';

const Navbar = ({ onItemClick }) => {
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
    <Nav className="nav-links d-flex flex-column flex-lg-row align-items-center gap-3 gap-lg-4 w-100 justify-content-end mb-0 ps-0 mt-3 mt-lg-0">
      <Button text="Inicio" to="/" onClick={onItemClick} />
      <Button text="Productos" to="/productos" matchPrefixes={["/producto/"]} onClick={onItemClick} />
      <Button text="Categorías" to="/categorias" onClick={onItemClick} />
      {user?.rol === 'admin' && <Button text="Gestión" to="/gestion" matchPrefixes={["/agregar-producto"]} onClick={onItemClick} />}
      <Button icon={<FaShoppingCart />} text={cartCount > 0 ? `(${cartCount})` : ''} to="/carrito" onClick={onItemClick} />
      {user ? (
        <>
          <Link to="/perfil" className="user-email-badge" title="Ver mi Perfil" onClick={onItemClick}>
            <FaUser /> Hola, {user.email.split('@')[0]}!
          </Link>
          <Button text="Salir" icon={<FaSignOutAlt />} onClick={() => { handleLogout(); onItemClick && onItemClick(); }} />
        </>
      ) : (
        <Button text="Ingresar" icon={<FaSignInAlt />} to="/login" onClick={onItemClick} />
      )}
    </Nav>
  );
};

export default Navbar;
