import { createContext, useState, useEffect } from "react";
import { collection, onSnapshot, query, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Leemos en tiempo real (onSnapshot)
  useEffect(() => {
    const consulta = query(collection(db, "productos-nacionales"));
    const unsub = onSnapshot(
      consulta,
      (snapshot) => {
        setProductos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setCargando(false);
      },
      (err) => {
        console.error("Error al escuchar cambios en productos:", err);
        setError(err.message);
        setCargando(false);
      }
    );
    return () => unsub();
  }, []);

  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, "productos-nacionales", id));
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      throw err;
    }
  };

  const agregarProducto = async (nuevoProd) => {
    try {
      const docRef = await addDoc(collection(db, "productos-nacionales"), nuevoProd);
      return docRef;
    } catch (err) {
      console.error("Error al agregar producto:", err);
      throw err;
    }
  };

  const actualizarProducto = async (id, prodActualizado) => {
    try {
      const docRef = doc(db, "productos-nacionales", id);
      await updateDoc(docRef, prodActualizado);
    } catch (err) {
      console.error("Error al actualizar producto:", err);
      throw err;
    }
  };

  return (
    <ProductosContext.Provider value={{ productos, cargando, error, eliminarProducto, agregarProducto, actualizarProducto }}>
      {children}
    </ProductosContext.Provider>
  );
};
