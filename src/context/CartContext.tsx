import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; size: string; color: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string; size: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; color: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  console.log('Cart action:', action.type, action.payload); // Debug log
  
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, size, color, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
      } else {
        const newItem: CartItem = {
          product,
          selectedSize: size,
          selectedColor: color,
          quantity
        };
        newItems = [...state.items, newItem];
      }

      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      console.log('New cart state:', { items: newItems, total: newTotal }); // Debug log
      return { items: newItems, total: newTotal };
    }

    case 'REMOVE_FROM_CART': {
      const { productId, size, color } = action.payload;
      const newItems = state.items.filter(
        item => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
      );
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      return { items: newItems, total: newTotal };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, size, color, quantity } = action.payload;
      const newItems = state.items.map(item =>
        item.product.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      );
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      return { items: newItems, total: newTotal };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0 };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    console.log('Adding to cart:', { product: product.name, size, color, quantity }); // Debug log
    dispatch({ type: 'ADD_TO_CART', payload: { product, size, color, quantity } });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, size, color } });
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, color, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  console.log('Current cart state:', state); // Debug log

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};