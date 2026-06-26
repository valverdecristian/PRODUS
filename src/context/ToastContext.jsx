import { createContext, useContext, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const showToast = useCallback((mensaje, tipo = 'success') => {
    const options = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

    switch (tipo) {
      case 'success':
        toast.success(mensaje, options);
        break;
      case 'error':
        toast.error(mensaje, options);
        break;
      case 'info':
        toast.info(mensaje, options);
        break;
      case 'warning':
      case 'warn':
        toast.warn(mensaje, options);
        break;
      default:
        toast(mensaje, options);
    }
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe usarse dentro de un ToastProvider');
  }
  return context;
};

