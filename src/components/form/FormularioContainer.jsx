import { useState, useEffect } from "react";
import FormularioProducto from "./FormularioProducto";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useProductos } from "../../hooks/useProductos";

const FormularioContainer = () => {
  const { agregarProducto } = useProductos();

  const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: ""
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (!imagenFile) {
      setPreviewUrl("");
      return;
    }
    const objectUrl = URL.createObjectURL(imagenFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imagenFile]);

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

    if (!datosForm.nombre || !datosForm.precio || !datosForm.stock || !datosForm.categoria) {
      showToast("Por favor, completa todos los campos del producto.", "error");
      return;
    }

    if (!imagenFile) {
      showToast("Por favor, selecciona una imagen para el producto.", "error");
      return;
    }

    setCargando(true);

    try {
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

      const productoCompleto = {
        nombre: datosForm.nombre,
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
        imagen: urlImagen,
        categoria: datosForm.categoria
      };

      console.log("Enviando los siguientes datos COMPLETOS a Firestore:", productoCompleto);
      const productoAgregado = await agregarProducto(productoCompleto);
      console.log("Producto agregado con ID:", productoAgregado.id);

      showToast("¡Producto agregado con éxito!", "success");

      setDatosForm({
        nombre: "",
        precio: "",
        stock: "",
        categoria: ""
      });
      setImagenFile(null);

      navigate("/gestion");
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
      showToast(`Hubo un error al guardar el producto: ${error.message}`, "error");
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
      previewUrl={previewUrl}
      onCancelar={() => navigate("/gestion")}
    />
  );
};

export default FormularioContainer;
