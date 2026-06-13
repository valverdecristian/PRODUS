import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

const Perfil = () => {
  const { user, logout } = useAuth();
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

  return (
    <div className="perfil-contenedor">
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
    </div>
  );
};

export default Perfil;
