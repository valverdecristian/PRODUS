import "./index.css";
import Layout from "./components/layout/Layout";
import ContenedorListaProductos from "./components/products/ContenedorListaProductos";
import ProductoDetalle from "./components/products/ProductoDetalle";
import Carrito from "./components/carrito/Carrito";
import FormularioContainer from "./components/form/FormularioContainer";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ContenedorListaProductos />} />
            <Route path="productos" element={<ContenedorListaProductos />} />
            <Route path="producto/:id" element={<ProductoDetalle />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="agregar-producto" element={<FormularioContainer />} />
          </Route>
        </Routes>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;