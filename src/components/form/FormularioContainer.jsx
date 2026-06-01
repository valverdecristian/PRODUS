import { useState } from "react";
import FormularioProducto from "./FormularioProducto";
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const FormularioContainer = () => {
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    stock: ""
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({
      ...datosForm,
      [name]: value,
    });
  };

  const manejarCambioImagen = (evento) => {
    setImagenFile(evento.target.files[0]);
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (!datosForm.nombre || !datosForm.precio || !datosForm.stock) {
      alert("Por favor, completa todos los campos del producto.");
      return;
    }

    if (!imagenFile) {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }

    setCargando(true);

    try {
      // 1. Upload image to Imgbb
      const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error("La clave API de Imgbb (VITE_IMGBB_API_KEY) no está configurada en las variables de entorno.");
      }

      const formData = new FormData();
      formData.append('image', imagenFile);

      console.log("Subiendo imagen a Imgbb...");
      const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
      });

      const datosImgbb = await respuestaImgbb.json();

      if (!datosImgbb.success) {
        throw new Error(datosImgbb.error?.message || "Error desconocido al subir la imagen a Imgbb");
      }

      const urlImagen = datosImgbb.data.url;
      console.log("Imagen subida con éxito. URL:", urlImagen);

      // 2. Upload product to Firebase Firestore
      const productoCompleto = {
        nombre: datosForm.nombre,
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
        imagen: urlImagen
      };

      console.log("Enviando los siguientes datos COMPLETOS a Firestore:", productoCompleto);
      const productosCollection = collection(db, "productos-nacionales");
      const productoAgregado = await addDoc(productosCollection, productoCompleto);
      console.log("Producto agregado con ID:", productoAgregado.id);

      alert("¡Producto agregado con éxito!");

      // Reset form
      setDatosForm({
        nombre: "",
        precio: "",
        stock: ""
      });
      setImagenFile(null);

      // Redirect to catalog
      navigate("/productos");
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
      alert(`Hubo un error al guardar el producto: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
      cargando={cargando}
    />
  );
};

export default FormularioContainer;
