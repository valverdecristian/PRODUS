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

  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    product: null,
    quantity: 0
  });

  const closeModal = () => {
    setModalInfo(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    if (quantity <= 0) return;

    const existingItem = cart.find((item) => item.id === product.id);
    const currentQty = existingItem ? existingItem.cantidad : 0;
    const finalQuantity = Math.min(currentQty + quantity, product.stock);
    const actualAdded = finalQuantity - currentQty;

    if (actualAdded <= 0) {
      return;
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].cantidad = finalQuantity;
        return newCart;
      } else {
        return [...prevCart, { ...product, cantidad: finalQuantity }];
      }
    });

    setModalInfo({
      isOpen: true,
      product,
      quantity: actualAdded
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
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
        modalInfo,
        closeModal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

