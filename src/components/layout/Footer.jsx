import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FaGithub, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';
import ContenedorListaContactos from '../contactos/ContenedorListaContactos';

const Footer = () => {
  const { showToast } = useToast();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);
  
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) {
      showToast("Por favor, completa todos los campos del formulario.", "error");
      return;
    }

    setCargando(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/crizthian2010@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Nombre: nombre,
          Email: email,
          Mensaje: mensaje
        })
      });

      if (response.ok) {
        showToast("¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.", "success");
        setNombre('');
        setEmail('');
        setMensaje('');
        setModalAbierto(false);
      } else {
        showToast("Hubo un problema al enviar el correo. Por favor, intenta de nuevo.", "error");
      }
    } catch (error) {
      showToast("Error de conexión. Por favor, intenta de nuevo más tarde.", "error");
    } finally {
      setCargando(false);
    }
  };

  return (
    <footer className="main-footer">
      <ContenedorListaContactos />
      
      <div className="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
        <p className="mb-0 text-md-start text-center">
          &copy; 2026 Produs - Desarrollado por Cristian Valverde. Todos los derechos reservados.
        </p>
        
        <div className="footer-social-links d-flex gap-3 mt-3 mt-md-0">
          <a 
            href="https://github.com/valverdecristian" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-link"
            title="Ver Perfil de GitHub"
          >
            <FaGithub size={24} />
          </a>
          <button 
            onClick={() => setModalAbierto(true)} 
            className="social-icon-link btn-link-reset"
            title="Enviar Correo de Contacto"
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <FaEnvelope size={24} />
          </button>
        </div>
      </div>

      <Modal 
        show={modalAbierto} 
        onHide={() => !cargando && setModalAbierto(false)} 
        centered
        className="custom-contact-modal"
      >
        <Modal.Header>
          <Modal.Title>Enviar Mensaje a Cristian</Modal.Title>
          <button 
            type="button" 
            className="close-button-custom" 
            onClick={() => !cargando && setModalAbierto(false)}
            disabled={cargando}
            aria-label="Close"
          >
            &times;
          </button>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Tu Nombre</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingresa tu nombre..." 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={cargando}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Tu Correo Electrónico</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="ejemplo@correo.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={cargando}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formMensaje">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                placeholder="Escribe tu mensaje aquí..." 
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                disabled={cargando}
                required
              />
            </Form.Group>

            <button 
              type="submit" 
              className="btn-cyber-submit d-flex align-items-center justify-content-center gap-2"
              disabled={cargando}
            >
              <FaPaperPlane />
              {cargando ? "Enviando mensaje..." : "Enviar Mensaje"}
            </button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center py-2">
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            O escribime directamente a: <a href="mailto:crizthian2010@gmail.com" className="text-info">crizthian2010@gmail.com</a>
          </span>
        </Modal.Footer>
      </Modal>
    </footer>
  );
};

export default Footer;