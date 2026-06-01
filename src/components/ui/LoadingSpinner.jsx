import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ size = "100px", mensaje = "Cargando..." }) => {
  return (
    <div className={styles.loaderContainer}>
      <svg 
        viewBox="0 0 500 500" 
        className={styles.animatedLogo}
        style={{ width: size, height: size }}
      >
        <circle cx="250" cy="250" r="240" fill="#03091e" />
        <g fill="#3ca6f5">
          <path d="M 130,105 H 215 a 12,12 0 0 1 12,12 V 340 l -55,65 a 12,12 0 0 1 -21,-8 V 117 a 12,12 0 0 1 12,-12 z" />
          <path d="M 245,105 h 15 c 40,0 100,35 140,75 a 12,12 0 0 1 -4,20 H 257 a 12,12 0 0 1 -12,-12 V 117 a 12,12 0 0 1 12,-12 z" />
          <path d="M 245,230 H 400 a 12,12 0 0 1 8,20 L 262,395 a 16,16 0 0 1 -25,-12 V 242 a 12,12 0 0 1 12,-12 z" />
        </g>
      </svg>
      <p className={styles.loadingText}>{mensaje}</p>
    </div>
  );
};

export default LoadingSpinner;