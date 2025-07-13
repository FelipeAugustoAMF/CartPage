import { useState } from "react";
import { supabaseService } from "../services/supabaseService";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (term) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabaseService.products.search(term);

      if (error) throw error;
      setProducts(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, search };
}
