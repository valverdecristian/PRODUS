import './index.css';
import Layout from './components/layout/Layout';
import TarjetaProducto from './components/products/TarjetaProducto';
import { productos } from './data/productos';

function App() {
  return (
    <Layout>
      <section className="catalog-container">
        <h2>Productos Destacados</h2>
        <div className="product-grid">
          {productos.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              imagen={producto.imagen}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default App;