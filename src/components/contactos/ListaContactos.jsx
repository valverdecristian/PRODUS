import { Row, Col } from 'react-bootstrap';
import TarjetaContacto from './TarjetaContacto';

const ListaContactos = ({ contactos }) => {
    return (
        <Row className="justify-content-center g-2 g-sm-3 flex-nowrap px-2 m-0 mx-auto" style={{ maxWidth: '720px' }}>
            {contactos.map((contacto) => (
                <Col xs={4} key={contacto.id} className="d-flex align-items-stretch justify-content-center" style={{ minWidth: 0 }}>
                    <TarjetaContacto {...contacto} />
                </Col>
            ))}
        </Row>
    );
};
export default ListaContactos;