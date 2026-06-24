import { Row, Col } from 'react-bootstrap';
import TarjetaProducto from "./TarjetaProducto";

const ListaProductos = ({ productos }) => {
  return (
    <Row className="g-4 justify-content-center">
      {productos.map((producto) => (
        <Col xs={12} sm={6} lg={4} key={producto.id} className="d-flex align-items-stretch">
          <TarjetaProducto {...producto} />
        </Col>
      ))}
    </Row>
  )
}

export default ListaProductos;