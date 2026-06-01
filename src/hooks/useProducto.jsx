import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useProducto = (id) => {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const productoRef = doc(db, 'productos-nacionales', id);
        const productoSnapshot = await getDoc(productoRef);

        if (productoSnapshot.exists()) {
          setProducto({
            id: productoSnapshot.id,
            ...productoSnapshot.data()
          });
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

  return { producto, cargando, error };
};
