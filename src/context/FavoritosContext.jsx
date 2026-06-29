import { createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState([]);

  const storageKey = user ? `favoritos_${user.uid}` : 'favoritos_guest';

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setFavoritos(saved ? JSON.parse(saved) : []);
    } catch (error) {
      console.error('Error al cargar favoritos de localStorage:', error);
      setFavoritos([]);
    }
  }, [storageKey]);

  // Alterna un favorito (agrega o remueve) y actualiza localStorage sincrónicamente
  const alternarFavorito = (id) => {
    if (!id) return;
    setFavoritos((prevFavoritos) => {
      const yaEsFavorito = prevFavoritos.includes(id);
      let nuevosFavoritos;
      if (yaEsFavorito) {
        nuevosFavoritos = prevFavoritos.filter((favId) => favId !== id);
      } else {
        nuevosFavoritos = [...prevFavoritos, id];
      }
      localStorage.setItem(storageKey, JSON.stringify(nuevosFavoritos));
      return nuevosFavoritos;
    });
  };

  const esFavorito = (id) => favoritos.includes(id);

  return (
    <FavoritosContext.Provider value={{ favoritos, alternarFavorito, esFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};
