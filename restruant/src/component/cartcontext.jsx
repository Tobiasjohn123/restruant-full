import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  // Show glass notification
  const showNotification = (message, type = 'success') => {
   
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Add item to cart
  const addToCart = (item) => {
   
    
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id);
      
      if (existingItem) {
        const updatedCart = prevCart.map(i =>
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
        showNotification(`✓ ${item.name} quantity increased`, 'success');
        return updatedCart;
      } else {
        showNotification(`✓ ${item.name} added to cart`, 'success');
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id, itemName) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    showNotification(`✗ ${itemName} removed from cart`, 'remove');
  };

  // Increase quantity
  const increaseQuantity = (id, itemName) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    showNotification(`✓ ${itemName} quantity increased`, 'success');
  };

  // Decrease quantity
  const decreaseQuantity = (id, itemName) => {
    setCart(prevCart => {
      const item = prevCart.find(i => i.id === id);
      
      if (item.quantity === 1) {
        showNotification(`✗ ${itemName} removed from cart`, 'remove');
        return prevCart.filter(i => i.id !== id);
      }
      
      showNotification(`✓ ${itemName} quantity decreased`, 'success');
      return prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  // Get total price
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get total items count
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // 🟢 1. DEFINE THE CLEAR CART FUNCTION HERE
  const clearCart = () => {
     setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      getTotal,
      getItemCount,
      clearCart, // 🟢 2. ADD CLEAR CART TO THE EXPORTED VALUES HERE
      notification
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    console.warn('useCart must be used within a CartProvider');
    return {
      cart: [],
      addToCart: () => {},
      removeFromCart: () => {},
      increaseQuantity: () => {},
      decreaseQuantity: () => {},
      getTotal: () => 0,
      getItemCount: () => 0,
      clearCart: () => {}, // Safe fallback
      notification: null
    };
  }
  return context;
}