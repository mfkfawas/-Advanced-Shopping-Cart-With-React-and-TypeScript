import { createContext, useContext, ReactNode, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import useLocalStorage from '../hooks/useLocalStorage';
interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface ShoppingCartContext {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  openOrCloseCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
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
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);
  const [isOpen, setIsOpen] = useState(false);

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id);
      }

      return currItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
    });
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => currItems.filter(item => item.id !== id));
  }

  const openOrCloseCart = () => setIsOpen(!isOpen);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  return (
    <shoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openOrCloseCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </shoppingCartContext.Provider>
  );
}
