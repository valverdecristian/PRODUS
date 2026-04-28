import TarjetaProducto from "./TarjetaProducto";

const ListaProductos = ({ productos }) => {
  return (
    <div className="product-grid">
      {productos.map((producto) => (
        <TarjetaProducto key={producto.id} {...producto} />
      ))}
    </div>
  )
}

export default ListaProductos;