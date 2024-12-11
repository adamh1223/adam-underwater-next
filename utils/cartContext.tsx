'use client'

import { ReactNode, createContext, useState, useContext } from "react";

interface CartProviderProps {
  children: ReactNode;
}
interface CartContextProps {
  addToCart: () => void;
  removeFromCart: () => void;
  getCartCount: () => number;
}

// Correct the type of CartContext
const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState(0);

  const addToCart = () => {
    setCartItems((cartItems) => cartItems + 1);
  };

  const removeFromCart = () => {
    setCartItems((cartItems) => Math.max(cartItems - 1, 0)); // Prevent negative values
  };

  const getCartCount = () => {
    return cartItems;
  };

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
