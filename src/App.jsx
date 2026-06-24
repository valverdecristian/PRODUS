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
import Inicio from "./components/inicio/Inicio";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Perfil from "./components/perfil/Perfil";
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
              <Route index element={<Inicio />} />
              <Route path="productos" element={<ContenedorListaProductos />} />
              <Route path="producto/:id/:slug?" element={<ProductoDetalle />} />
              <Route 
                path="carrito" 
                element={
                  <ProtectedRoute>
                    <Carrito />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="agregar-producto" 
                element={
                  <ProtectedRoute rolesPermitidos={["admin"]}>
                    <FormularioContainer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="gestion" 
                element={
                  <ProtectedRoute rolesPermitidos={["admin"]}>
                    <Gestion />
                  </ProtectedRoute>
                } 
              />
              <Route path="categorias" element={<CategoriasContainer />} />
              <Route 
                path="login" 
                element={
                  <ProtectedRoute soloAnonimos>
                    <Login />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="registro" 
                element={
                  <ProtectedRoute soloAnonimos>
                    <Registro />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="perfil" 
                element={
                  <ProtectedRoute>
                    <Perfil />
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Routes>
        </CartProvider>
      </ProductosProvider>
    </ToastProvider>
  );
}

export default App;