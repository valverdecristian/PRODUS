import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch debe ser usado dentro de un SearchProvider');
  }
  return context;
};
