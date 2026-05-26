import "./index.css";
import Layout from "./components/layout/Layout";
import ContenedorListaProductos from "./components/products/ContenedorListaProductos";
import ProductoDetalle from "./components/products/ProductoDetalle";
import Carrito from "./components/carrito/Carrito";
import { CartProvider } from "./context/CartContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ContenedorListaProductos />} />
          <Route path="productos" element={<ContenedorListaProductos />} />
          <Route path="producto/:id" element={<ProductoDetalle />} />
          <Route path="carrito" element={<Carrito />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;