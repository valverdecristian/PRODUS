import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    if (quantity <= 0) return;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        // Si ya está, actualizamos la cantidad asegurando no exceder el stock disponible
        const newCart = [...prevCart];
        const newQuantity = newCart[existingItemIndex].cantidad + quantity;
        newCart[existingItemIndex].cantidad = Math.min(newQuantity, product.stock);
        return newCart;
      } else {
        // Si no está, lo agregamos
        return [...prevCart, { ...product, cantidad: Math.min(quantity, product.stock) }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          // Limitar la cantidad al stock disponible del item
          const newQty = Math.max(1, Math.min(quantity, item.stock));
          return { ...item, cantidad: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => { setCart([]) };

  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);

  const cartTotal = cart.reduce((total, item) => total + item.precio * item.cantidad, 0);

  // NUEVA FUNCION: Obtener la cantidad de un item especifico
  const getCantidadActual = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.cantidad : 0;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        getCantidadActual,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
