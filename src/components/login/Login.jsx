import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
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

      <p className="login-footer">
        ¿No tienes cuenta? <Link to="/registro" className="login-link">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;
