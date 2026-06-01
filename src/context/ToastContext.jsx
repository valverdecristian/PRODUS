import { createContext, useContext, useState, useCallback } from 'react';
import './Toast.css';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((mensaje, tipo = 'success') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, mensaje, tipo }]);

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      // First trigger fade-out transition
      setToasts((prevToasts) =>
        prevToasts.map((t) => (t.id === id ? { ...t, fadingOut: true } : t))
      );

      // Then remove it 300ms later (matching css transition)
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
      }, 300);
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  const getIcon = (tipo) => {
    switch (tipo) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toasts-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.tipo} ${toast.fadingOut ? 'fade-out' : ''}`}
          >
            <div className="toast-content">
              <span className="toast-icon">{getIcon(toast.tipo)}</span>
              <span>{toast.mensaje}</span>
            </div>
            <button className="toast-close" onClick={() => removeToast(toast.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>
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
