import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

// ====================================================================
// CONFIGURA AQUÍ LAS CREDENCIALES DE ACCESO RÁPIDO PARA LAS DEMOS
// ====================================================================
// Reemplaza estos valores con los correos y contraseñas reales creados
// en tu base de datos de Firebase:
const CREDENCIALES_ADMIN = {
  email: "admin@gmail.com",
  password: "admin1234"
};

const CREDENCIALES_CLIENTE = {
  email: "cliente@gmail.com",
  password: "cliente1234"
};
// ====================================================================

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [showQuickAccess, setShowQuickAccess] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Por favor, completa todos los campos.", "error");
      return;
    }
    setCargando(true);
    login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario logueado:", user);
        showToast("¡Inicio de sesión exitoso!", "success");
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("Error en el login:", errorMessage);
        showToast("Error al iniciar sesión: " + errorMessage, "error");
      })
      .finally(() => {
        setCargando(false);
      });
  };

  return (
    <div className="login-contenedor">
      <h2 className="login-titulo">Iniciar Sesión</h2>
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Correo Electrónico:</label>
          <input
            id="email"
            className="form-input"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={cargando}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Contraseña:</label>
          <input
            id="password"
            className="form-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={cargando}
          />
        </div>

        <div className="form-actions">
          <button className="btn-ingresar" type="submit" disabled={cargando}>
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </div>
      </form>

      <div className="login-quick-access">
        <button 
          type="button" 
          className="btn-quick-access-toggle"
          onClick={() => setShowQuickAccess(true)}
        >
          Acceso Rápido
        </button>
      </div>

      <p className="login-footer">
        ¿No tienes cuenta? <Link to="/registro" className="login-link">Regístrate aquí</Link>
      </p>

      {showQuickAccess && (
        <div className="login-modal-overlay" onClick={() => setShowQuickAccess(false)}>
          <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Acceso Rápido</h3>
            <p>Selecciona un perfil para rellenar las credenciales automáticamente:</p>
            <div className="quick-access-badges-modal">
              <button 
                type="button" 
                className="badge-quick-access admin"
                onClick={() => {
                  setEmail(CREDENCIALES_ADMIN.email);
                  setPassword(CREDENCIALES_ADMIN.password);
                  setShowQuickAccess(false);
                }}
              >
                Admin
              </button>
              <button 
                type="button" 
                className="badge-quick-access cliente"
                onClick={() => {
                  setEmail(CREDENCIALES_CLIENTE.email);
                  setPassword(CREDENCIALES_CLIENTE.password);
                  setShowQuickAccess(false);
                }}
              >
                Cliente
              </button>
            </div>
            <button 
              type="button" 
              className="btn-modal-close"
              onClick={() => setShowQuickAccess(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
