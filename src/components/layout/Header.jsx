import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/produsbarra.jpg';

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">
          <img src={logoImg} alt="PRODUS" className="logo-img" />
        </Link>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;