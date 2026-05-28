import styles from './TarjetaContacto.module.css';

const TarjetaContacto = ({ nombre, linkedin, rol, foto }) => {
    return (
        <div className={styles.item}>
            <h2>{nombre}</h2>
            <p>{rol}</p>
            <img src={foto} alt={nombre} width="200" />
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
                Ver LinkedIn
            </a>
        </div>
    );
};
export default TarjetaContacto;