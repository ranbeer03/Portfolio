import { createContext, useState, useEffect, useMemo } from 'react';

const CART_STORAGE_KEY = 'ranbeer-art-cart';

export const CartContext = createContext({
  items: [],
  itemCount: 0,
  subtotal: 0,
  addItem: () => {},
  removeItem: () => {},
  setQuantity: () => {},
  clearCart: () => {},
});

/*
 * Cart line shape (price and name are snapshotted at add time):
 * { artworkId, editionKey, editionLabel, name, imageUrl, unitPrice,
 *   quantity, maxQuantity }
 */
const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const isSameLine = (line, artworkId, editionKey) =>
      line.artworkId === artworkId && line.editionKey === editionKey;

    const addItem = (item) => {
      setItems((previous) => {
        const existing = previous.find((line) =>
          isSameLine(line, item.artworkId, item.editionKey)
        );
        if (!existing) return [...previous, { ...item, quantity: 1 }];
        return previous.map((line) =>
          line === existing
            ? { ...line, quantity: Math.min(line.quantity + 1, line.maxQuantity) }
            : line
        );
      });
    };

    const removeItem = (artworkId, editionKey) => {
      setItems((previous) =>
        previous.filter((line) => !isSameLine(line, artworkId, editionKey))
      );
    };

    const setQuantity = (artworkId, editionKey, quantity) => {
      setItems((previous) =>
        previous.map((line) =>
          isSameLine(line, artworkId, editionKey)
            ? { ...line, quantity: Math.min(Math.max(1, quantity), line.maxQuantity) }
            : line
        )
      );
    };

    const clearCart = () => setItems([]);

    const itemCount = items.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = items.reduce(
      (sum, line) => sum + line.unitPrice * line.quantity,
      0
    );
    return { items, itemCount, subtotal, addItem, removeItem, setQuantity, clearCart };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
