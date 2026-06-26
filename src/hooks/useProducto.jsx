import { useState, useEffect } from 'react';
import { useProductos } from './useProductos';
import { generarSlug } from '../utils/slug';

export const useProducto = (slug) => {
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

    if (slug) {
      const encontrado = productos.find(p => p.id === slug || generarSlug(p.nombre) === slug);
      if (encontrado) {
        setProducto(encontrado);
        setError(null);
      } else {
        setProducto(null);
        setError('Producto no encontrado');
      }
      setCargando(false);
    }
  }, [slug, productos, cargandoProductos, errorProductos]);

  return { producto, cargando, error };
};
