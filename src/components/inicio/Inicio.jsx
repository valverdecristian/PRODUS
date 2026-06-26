import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProductos } from "../../hooks/useProductos";
import LoadingSpinner from "../ui/LoadingSpinner";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { generarSlug } from "../../utils/slug";
import { Container, Row, Col } from "react-bootstrap";
import "./Inicio.css";

const Inicio = () => {
  const { user } = useAuth();
  const { productos, cargando, error } = useProductos();
  const [currentIndex, setCurrentIndex] = useState(0);

  const televisores = productos.filter(
    (p) => p.categoria?.toLowerCase() === "cat_5"
  );

  const maxSlides = televisores.length;

  useEffect(() => {
    if (maxSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % maxSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [maxSlides]);

  const nextSlide = () => {
    if (maxSlides <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    if (maxSlides <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  if (cargando) {
    return <LoadingSpinner mensaje="Cargando portada..." />;
  }

  if (error) {
    return (
      <div className="inicio-container">
        <p className="error-message">Error al cargar la portada: {error}</p>
      </div>
    );
  }

  return (
    <div className="inicio-page">
      {televisores.length > 0 && (
        <section className="hero-carousel-section">
          <div className="carousel-wrapper">
            {maxSlides > 1 && (
              <button className="carousel-arrow prev" onClick={prevSlide} aria-label="Anterior">
                <FaChevronLeft />
              </button>
            )}

            <div className="carousel-window">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {televisores.map((tv) => (
                  <div className="carousel-slide-item" key={tv.id}>
                    <div className="banner-slide">
                      <div className="banner-content">
                        <span className="banner-badge">ESPECIAL MUNDIAL</span>
                        <h2 className="banner-title">{tv.nombre}</h2>
                        <p className="banner-desc">
                          Viví los partidos de la selección con la mejor definición y sonido inmersivo. ¡Hasta 20% OFF!
                        </p>
                        <div className="banner-price-wrapper">
                          <span className="price-label">Desde</span>
                          <span className="price-value">${tv.precio.toLocaleString("es-AR")}</span>
                        </div>
                        <Link to={`/producto/${generarSlug(tv.nombre)}`} className="btn-banner-cta">
                          Comprar Ahora
                        </Link>
                      </div>
                      <div className="banner-image-container">
                        <img src={tv.imagen} alt={tv.nombre} className="banner-image" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {maxSlides > 1 && (
              <button className="carousel-arrow next" onClick={nextSlide} aria-label="Siguiente">
                <FaChevronRight />
              </button>
            )}

            {/* Indicadores / Puntos */}
            {maxSlides > 1 && (
              <div className="carousel-indicators">
                {televisores.map((_, idx) => (
                  <button
                    key={idx}
                    className={`indicator-dot ${currentIndex === idx ? "active" : ""}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Ir al slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <Container className="inicio-container my-5">
        {!user && (
          <section className="promo-login-section mb-5">
            <Row className="promo-login-banner align-items-center justify-content-between p-4 rounded-3 g-4">
              <Col xs={12} md={8} className="promo-info text-start">
                <h3>¡Descuentos Exclusivos del Mundial!</h3>
                <p className="mb-0">
                  Para poder realizar compras en nuestra tienda y acceder a descuentos, debés registrarte o iniciar sesión en tu cuenta.
                </p>
              </Col>
              <Col xs={12} md={4} className="promo-actions d-flex gap-3 justify-content-md-end justify-content-center">
                <Link to="/login" className="btn-promo-login">
                  Iniciar Sesión
                </Link>
                <Link to="/registro" className="btn-promo-reg">
                  Registrarse
                </Link>
              </Col>
            </Row>
          </section>
        )}

        {/* Sección de Bienvenida general */}
        <section className="welcome-info-section text-center p-4 rounded-3 border">
          <h2>Todo lo que necesitas esta en Produs</h2>
          <p className="mx-auto" style={{ maxWidth: '750px' }}>
            Explorá nuestro catálogo completo con envíos a todo el país. Contamos con los mejores productos de tecnología, electrohogar, climatización y más.
          </p>
          <div className="welcome-actions mt-3">
            <Link to="/productos" className="btn-welcome-catalog">
              Ver Todos los Productos
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Inicio;
