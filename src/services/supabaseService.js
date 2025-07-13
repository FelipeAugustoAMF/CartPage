import { supabase } from "./supabaseClient";

////////// products //////////
async function searchProducts(term) {
  return await supabase
    .from("products")
    .select("*")
    .ilike("description", `%${term}%`);
}

////////// cart //////////
async function loadCart() {
  return await supabase
    .from("cartItems")
    .select("quantity, product:products(*)")
    .order("createdAt", { ascending: true });
}

async function addToCart(productId) {
  await supabase
    .from("cartItems")
    .insert({ productId, quantity: 1, createdAt: new Date() });
}

async function updateQuantity(productId, quantity) {
  return await supabase
    .from("cartItems")
    .update({ quantity })
    .eq("productId", productId);
}

async function removeFromCart(productId) {
  return supabase.from("cartItems").delete().eq("productId", productId);
}

///////////////
export const supabaseService = {
  products: {
    search: searchProducts,
  },
  cart: {
    loadCart,
    addToCart,
    updateQuantity,
    removeFromCart,
  },
};
