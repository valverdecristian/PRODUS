import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-button">Inicio</Link>
        <Link to="/productos" className="nav-button">Productos</Link>
        <Link to="/destacados" className="nav-button">Destacados</Link>
        <Link to="/carrito" className="nav-button">Carrito 🛒</Link>
      </div>
    </nav>
  );
};

export default Navbar;