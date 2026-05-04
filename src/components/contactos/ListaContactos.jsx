import TarjetaContacto from './TarjetaContacto';
import styles from './TarjetaContacto.module.css';

const ListaContactos = ({contactos}) => {
    return (
        <div className={styles.flexContainer}>
            {contactos.map((contacto) => (
                <TarjetaContacto key={contacto.id} {...contacto} />
            ))}
        </div>
    );
};
export default ListaContactos;