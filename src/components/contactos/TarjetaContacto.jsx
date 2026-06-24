import styles from './TarjetaContacto.module.css';

const TarjetaContacto = ({ nombre, linkedin, rol, foto }) => {
    return (
        <div className={`${styles.item} h-100`}>
            <div>
                <h2>{nombre}</h2>
                <p>{rol}</p>
                <img src={foto} alt={nombre} className="img-fluid" />
            </div>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
                Ver LinkedIn
            </a>
        </div>
    );
};
export default TarjetaContacto;