import { createContext, useContext, ReactNode, useState } from 'react';
interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface ShoppingCartContext {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

interface CartItem {
  id: number;
  quantity: number;
}

const shoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(shoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <shoppingCartContext.Provider value={{}}>{children}</shoppingCartContext.Provider>
  );
}
