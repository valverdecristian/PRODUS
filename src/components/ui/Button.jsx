import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ text = 'Button', to = '#', onClick = null }) => {
  const buttonContent = (
    <button className="button" data-text={text} onClick={onClick}>
      <span className="actual-text">&nbsp;{text}&nbsp;</span>
      <span aria-hidden="true" className="hover-text">&nbsp;{text}&nbsp;</span>
    </button>
  );

  return to !== '#' ? <Link to={to}>{buttonContent}</Link> : buttonContent;
};

export default Button;