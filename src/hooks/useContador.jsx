import { useState } from 'react';

export const useContador = (stock, valorInicial = 0) => {
  const [cantidad, setCantidad] = useState(valorInicial);

  const incrementar = () => {
    if (cantidad < stock) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 0) setCantidad(cantidad - 1);
  };

  return { cantidad, incrementar, decrementar };
};