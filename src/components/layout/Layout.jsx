import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import ModalAgregarCarrito from '../ui/ModalAgregarCarrito';
import './Layout.css';

const Layout = () => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <ModalAgregarCarrito />
    </div>
  );
};

export default Layout;