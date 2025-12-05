import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Cart, CartItem, Product } from "@shared/schema";

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "electro-store-cart";

function loadCartFromStorage(): Cart {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load cart from storage", e);
  }
  return { items: [], total: 0, itemCount: 0 };
}

function saveCartToStorage(cart: Cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Failed to save cart to storage", e);
  }
}

function calculateCart(items: CartItem[]): Cart {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { items, total, itemCount };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(() => loadCartFromStorage());
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.product.id === product.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = prevCart.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `cart-${product.id}-${Date.now()}`,
          product,
          quantity,
        };
        newItems = [...prevCart.items, newItem];
      }
      
      return calculateCart(newItems);
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.id !== itemId);
      return calculateCart(newItems);
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        const newItems = prevCart.items.filter((item) => item.id !== itemId);
        return calculateCart(newItems);
      }
      
      const newItems = prevCart.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      return calculateCart(newItems);
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0, itemCount: 0 });
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
