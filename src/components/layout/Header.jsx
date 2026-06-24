import { useState } from 'react';
import { Navbar as BootstrapNavbar, Container } from 'react-bootstrap';
import NavbarLinks from './Navbar';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/produsbarra.jpg';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <BootstrapNavbar 
      as="header" 
      expand="lg" 
      className="main-header p-0" 
      sticky="top"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container fluid className="px-4 py-2 d-flex align-items-center justify-content-between">
        <div className="logo">
          <Link to="/" onClick={() => setExpanded(false)}>
            <img src={logoImg} alt="PRODUS" className="logo-img" />
          </Link>
        </div>
        <BootstrapNavbar.Toggle aria-controls="main-navbar-nav" className="navbar-toggler border-0" />
        <BootstrapNavbar.Collapse id="main-navbar-nav" className="justify-content-end w-100">
          <NavbarLinks onItemClick={() => setExpanded(false)} />
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Header;