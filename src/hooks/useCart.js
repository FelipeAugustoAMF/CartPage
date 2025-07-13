import { useState, useEffect } from "react";
import { supabaseService } from "../services/supabaseService";

export default function useCart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newItemCounter, setNewItemCounter] = useState(0);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabaseService.cart.loadCart();
      if (error) throw error;
      setItems(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    setLoading(true);
    try {
      const existing = items.find((i) => i.product.id === product.id);

      if (!existing) {
        await supabaseService.cart.addToCart(product.id);
        setItems((prev) => [...prev, { product, quantity: 1 }]);
        setNewItemCounter((prev) => prev + 1);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    setLoading(true);
    try {
      if (quantity > 0) {
        await supabaseService.cart.updateQuantity(productId, quantity);
        setItems((prev) =>
          prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
        );
      } else {
        await supabaseService.cart.removeFromCart(productId);
        setItems((prev) => prev.filter((i) => i.product.id !== productId));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const resetNewItemCounter = () => setNewItemCounter(0);
  const removeFromCart = async (productId) => updateQuantity(productId, 0);

  useEffect(() => {
    fetchCart();
  }, []);

  return {
    items,
    newItemCounter,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    resetNewItemCounter,
  };
}
