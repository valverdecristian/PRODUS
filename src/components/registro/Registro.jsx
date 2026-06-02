import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import "./Registro.css";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { signup } = useAuth();

  const handleRegistro = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      showToast("Por favor, completa todos los campos.", "error");
      return;
    }
    if (password !== confirmPassword) {
      showToast("Las contraseñas no coinciden.", "error");
      return;
    }
    if (password.length < 6) {
      showToast("La contraseña debe tener al menos 6 caracteres.", "error");
      return;
    }

    setCargando(true);
    signup(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario registrado:", user);
        showToast("¡Registro exitoso! Bienvenido.", "success");
        navigate('/');
      })
      .catch((error) => {
        console.error("Error en el registro:", error);
        if (error.code === 'auth/email-already-in-use') {
          // Usamos window.confirm para hacer la pregunta al usuario
          const quiereLoguearse = window.confirm(
            'Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?'
          );
          if (quiereLoguearse) {
            // Si el usuario confirma, lo redirigimos a la página de login
            navigate('/login');
          } else {
            // Si el usuario cancela, lo redirigimos a la página de inicio
            navigate('/');
          }
        } else {
          showToast("Error al registrarse: " + error.message, "error");
        }
      })
      .finally(() => {
        setCargando(false);
      });
  };

  return (
    <div className="registro-contenedor">
      <h2 className="registro-titulo">Crear Cuenta</h2>

      <form onSubmit={handleRegistro}>
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
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={cargando}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            id="confirmPassword"
            className="form-input"
            type="password"
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={cargando}
          />
        </div>

        <div className="form-actions">
          <button className="btn-registrar" type="submit" disabled={cargando}>
            {cargando ? "Registrando..." : "Registrarse"}
          </button>
        </div>
      </form>

      <p className="registro-footer">
        ¿Ya tienes cuenta? <Link to="/login" className="registro-link">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default Registro;
