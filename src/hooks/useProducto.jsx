import { useState, useEffect } from 'react';
import { useProductos } from './useProductos';

export const useProducto = (id) => {
  const { productos, cargando: cargandoProductos, error: errorProductos } = useProductos();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cargandoProductos) {
      setCargando(true);
      return;
    }

    if (errorProductos) {
      setError(errorProductos);
      setCargando(false);
      return;
    }

    if (id) {
      const encontrado = productos.find(p => p.id === id);
      if (encontrado) {
        setProducto(encontrado);
        setError(null);
      } else {
        setProducto(null);
        setError('Producto no encontrado');
      }
      setCargando(false);
    }
  }, [id, productos, cargandoProductos, errorProductos]);

  return { producto, cargando, error };
};
