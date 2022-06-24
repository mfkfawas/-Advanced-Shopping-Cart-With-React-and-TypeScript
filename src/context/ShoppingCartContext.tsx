import { createContext, useContext, ReactNode } from 'react';

const shoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(shoppingCartContext);
}

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  return (
    <shoppingCartContext.Provider value={{}}>{children}</shoppingCartContext.Provider>
  );
}
