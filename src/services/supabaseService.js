// Aqui é onde as chamadas de API para integração com o banco de dados (supabase) estão definidas
import { supabase } from "./supabaseClient";

// Obtém os produtos cadastrados no banco de dados
async function searchProducts(term) {
  return await supabase
    .from("products")
    .select("*")
    .ilike("description", `%${term}%`);

  // Esta chamada é equivalente a:
  // GET https://scviprytakseyijnsljv.supabase.co/rest/v1/cartItems?select=quantity,product:products(*)&order=createdAt.asc
}

// Obtém todos os itens salvos no carrinho
async function loadCart() {
  return await supabase
    .from("cartItems")
    .select("quantity, product:products(*)")
    .order("createdAt", { ascending: true });

  // Esta chamada é equivalente a:
  // GET https://scviprytakseyijnsljv.supabase.co/rest/v1/products?select=*&description=ilike.%%
}

// Adiciona um item ao carrinho
async function addToCart(productId) {
  await supabase
    .from("cartItems")
    .insert({ productId, quantity: 1, createdAt: new Date() });

  // Esta chamada é equivalente a:
  // POST https://scviprytakseyijnsljv.supabase.co/rest/v1/cartItems
  // {
  //   "productId":3,
  //   "quantity":1,
  //   "createdAt":"2025-07-13T22:32:25.996Z"
  // }
}

// Atualiza a quantidade de um produto
async function updateQuantity(productId, quantity) {
  return await supabase
    .from("cartItems")
    .update({ quantity })
    .eq("productId", productId);

  // Esta chamada é equivalente a:
  // PATCH https://scviprytakseyijnsljv.supabase.co/rest/v1/cartItems?productId=eq.3
  // {
  //   "quantity": 3
  // }
}

// Remove um produto do carrinho
async function removeFromCart(productId) {
  return supabase.from("cartItems").delete().eq("productId", productId);

  // Esta chamada é equivalente a:
  // DELETE https://scviprytakseyijnsljv.supabase.co/rest/v1/cartItems?productId=eq.3
}

// Expões o serviço para ser utilizado pelos outros componentes
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
