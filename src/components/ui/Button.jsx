import { Link, useLocation } from 'react-router-dom';
import './Button.css';

const Button = ({ text = '', to = '#', onClick = null, matchPrefixes = [], icon = null }) => {
  const location = useLocation();
  const hasIcon = !!icon;
  
  const buttonContent = (
    <button className={`button ${hasIcon ? 'button-with-icon' : ''}`} data-text={text} onClick={onClick}>
      {hasIcon ? (
        <span className="btn-content-wrapper">
          {icon}
          {text && <span className="btn-text">{text}</span>}
        </span>
      ) : (
        <>
          <span className="actual-text">&nbsp;{text}&nbsp;</span>
          <span aria-hidden="true" className="hover-text">&nbsp;{text}&nbsp;</span>
        </>
      )}
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