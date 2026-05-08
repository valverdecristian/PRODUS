import Button from '../ui/Button';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Button text="Inicio" to="/" />
        <Button text="Productos" to="/productos" />
        <Button text="Destacados" to="/destacados" />
        <Button text="🛒" to="/carrito" />
      </div>
    </nav>
  );
};

export default Navbar;