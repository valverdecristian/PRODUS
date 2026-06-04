import { useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error('useProductos debe ser usado dentro de un ProductosProvider');
  }
  return context;
};
