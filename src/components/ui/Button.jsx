import { Link, useLocation } from 'react-router-dom';
import './Button.css';

const Button = ({ text = 'Button', to = '#', onClick = null, matchPrefixes = [] }) => {
  const location = useLocation();
  const buttonContent = (
    <button className="button" data-text={text} onClick={onClick}>
      <span className="actual-text">&nbsp;{text}&nbsp;</span>
      <span aria-hidden="true" className="hover-text">&nbsp;{text}&nbsp;</span>
    </button>
  );

  if (to === '#') {
    return buttonContent;
  }

  const pathname = location.pathname;
  let isActive = false;
  if (to === '/') {
    isActive = pathname === '/';
  } else {
    isActive = pathname.startsWith(to) || matchPrefixes.some(prefix => pathname.startsWith(prefix));
  }

  return (
    <Link to={to} className={isActive ? "nav-link-active" : ""}>
      {buttonContent}
    </Link>
  );
};

export default Button;