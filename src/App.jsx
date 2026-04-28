import './index.css';
import Layout from './components/layout/Layout';
import ContenedorListaProductos from './components/products/ContenedorListaProductos';

function App() {
  return (
    <Layout>
      <section className="catalog-container">
        <ContenedorListaProductos />
      </section>
    </Layout>
  );
}

export default App;