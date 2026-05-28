import ListaContactos from './ListaContactos';
import { useEquipo } from '../../hooks/useEquipo';

const ContenedorListaContactos = () => {
  const { contactos, cargando, error } = useEquipo();

  if (cargando) {
    return <p>Cargando equipo, por favor espere...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Lista de Contactos</h2>
      <div>
        <ListaContactos contactos={contactos} />
      </div>
    </div>
  )
}

export default ContenedorListaContactos;
