import { Input, Spin, Alert } from "antd";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

export default function ProductsPage({ cart }) {
  const { products, loading, error, search } = useProducts();

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", marginBottom: "80px" }}>
        <Input.Search
          loading={loading}
          placeholder="Buscar produtos"
          enterButton="Buscar"
          size="large"
          onSearch={search}
        />
      </div>

      {loading && (
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 1000,
          }}
        >
          <Spin size="large" />
        </div>
      )}

      {error && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "24px 0",
          }}
        >
          <Alert message={error.message || String(error)} type="error" />
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 300px))",
          gap: 24,
          justifyContent: "center",
        }}
      >
        {products.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onAdd={cart.addToCart}
            allowAdd={
              !(cart.items && cart.items.find((p) => p.product.id == prod.id))
            }
          />
        ))}
      </div>
    </div>
  );
}
