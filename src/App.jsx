import './index.css';
import Layout from './components/layout/Layout';
import ContenedorListaProductos from './components/products/ContenedorListaProductos';
import ProductoDetalle from './components/products/ProductoDetalle';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<ContenedorListaProductos />}
        />
        <Route
          path="productos"
          element={<ContenedorListaProductos />}
        />
        <Route
          path="producto/:id"
          element={<ProductoDetalle />}
        />
      </Route>
    </Routes>
  );
}

export default App;