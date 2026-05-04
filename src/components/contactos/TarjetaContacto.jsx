import styles from './TarjetaContacto.module.css';

const TarjetaContacto = ({ nombre, email, puesto, foto }) => {
    return (
        <div className={styles.item}>
            <h2>{nombre}</h2>
            <p>{email}</p>
            <p>{puesto}</p>
            <img src={foto} alt={nombre} width="200" />

        </div>
    );
};
export default TarjetaContacto;