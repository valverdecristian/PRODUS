import "./index.css";
import Layout from "./components/layout/Layout";
import ContenedorListaProductos from "./components/products/ContenedorListaProductos";
import ProductoDetalle from "./components/products/ProductoDetalle";
import Carrito from "./components/carrito/Carrito";
import FormularioContainer from "./components/form/FormularioContainer";
import CategoriasContainer from "./components/products/CategoriasContainer";
import Login from "./components/login/Login";
import Registro from "./components/registro/Registro";
import Gestion from "./components/gestion/Gestion";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { ProductosProvider } from "./context/ProductosContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ToastProvider>
      <ProductosProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ContenedorListaProductos />} />
              <Route path="productos" element={<ContenedorListaProductos />} />
              <Route path="producto/:id" element={<ProductoDetalle />} />
              <Route path="carrito" element={<Carrito />} />
              <Route path="agregar-producto" element={<FormularioContainer />} />
              <Route path="gestion" element={<Gestion />} />
              <Route path="categorias" element={<CategoriasContainer />} />
              <Route path="login" element={<Login />} />
              <Route path="registro" element={<Registro />} />
            </Route>
          </Routes>
        </CartProvider>
      </ProductosProvider>
    </ToastProvider>
  );
}

export default App;