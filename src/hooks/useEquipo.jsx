import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useEquipo = () => {
    const [contactos, setContactos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEquipo = async () => {
            try {
                const equipoCollection = collection(db, 'equipo');
                const equipoSnapshot = await getDocs(equipoCollection);
                const equipoList = equipoSnapshot.docs.map(doc => ({
                    id: doc.id,
                    nombre: doc.data().nombre,
                    linkedin: doc.data().linkedinURL,
                    rol: doc.data().rol,
                    foto: doc.data().foto,
                    ...doc.data()
                }));
                setContactos(equipoList);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        fetchEquipo();
    }, []);

    return { contactos, cargando, error };
};
