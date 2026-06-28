import { useContext } from 'react';
import { FavoritosContext } from '../context/FavoritosContext';

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error('useFavoritos debe ser usado dentro de un FavoritosProvider');
  }
  return context;
};
