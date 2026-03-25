const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <a href="#inicio" className="nav-button">Inicio</a>
        <a href="#productos" className="nav-button">Productos</a>
        <a href="#contacto" className="nav-button">Contacto</a>
        <a href="#carrito" className="nav-button">Carrito 🛒</a>
      </div>
    </nav>
  );
};

export default Navbar;