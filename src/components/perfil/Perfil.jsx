import { useAuth } from '../../context/AuthContext';
import { useFavoritos } from '../../hooks/useFavoritos';
import { useProductos } from '../../hooks/useProductos';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import TarjetaProducto from '../products/TarjetaProducto';
import './Perfil.css';

const Perfil = () => {
  const { user, logout } = useAuth();
  const { favoritos } = useFavoritos();
  const { productos, cargando: cargandoProductos } = useProductos();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (!user) return null;

  const rolMostrado = user.rol === 'admin' ? 'Administrador' : 'Cliente';
  const inicial = user.email ? user.email.charAt(0).toUpperCase() : 'U';

  const favoritosProductos = productos.filter(p => favoritos.includes(p.id));

  return (
    <div className="perfil-contenedor">
      <Container>
        <Row className="gy-4 justify-content-center">
          <Col xs={12} md={5} lg={4}>
            <div className="perfil-card">
              <div className="perfil-avatar">
                {inicial}
              </div>
              <h2 className="perfil-bienvenida">
                ¡Hola de nuevo, <span className="user-email-highlight">{user.email}</span>!
              </h2>
              <p className="perfil-subtitulo">
                Nos alegra tenerte de vuelta en nuestra plataforma.
              </p>

              <div className="perfil-detalles">
                <div className="perfil-detalle-item">
                  <span className="detalle-label">Rol de Usuario</span>
                  <span className={`detalle-valor badge-rol ${user.rol}`}>
                    {rolMostrado}
                  </span>
                </div>
                <div className="perfil-detalle-item">
                  <span className="detalle-label">Correo</span>
                  <span className="detalle-valor font-mono">{user.email}</span>
                </div>
              </div>

              <div className="perfil-acciones">
                <button 
                  className="btn-volver" 
                  onClick={() => navigate('/')}
                >
                  Ir al Inicio
                </button>
                <button 
                  className="btn-cerrar-sesion" 
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </Col>
          <Col xs={12} md={7} lg={8}>
            <div className="perfil-favoritos">
              <h3 className="favoritos-titulo">
                <svg viewBox="0 0 24 24" className="favoritos-icono" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Mis Favoritos
              </h3>
              
              {cargandoProductos ? (
                <div className="favoritos-cargando">Cargando favoritos...</div>
              ) : favoritosProductos.length === 0 ? (
                <div className="favoritos-vacio">
                  <svg viewBox="0 0 24 24" className="favoritos-vacio-icono" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
                  </svg>
                  <p>Aún no tienes productos marcados como favoritos.</p>
                  <button className="btn-explorar" onClick={() => navigate('/productos')}>
                    Explorar Tienda
                  </button>
                </div>
              ) : (
                <Row className="g-3">
                  {favoritosProductos.map(producto => (
                    <Col xs={12} sm={6} key={producto.id} className="d-flex align-items-stretch">
                      <TarjetaProducto {...producto} />
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Perfil;
