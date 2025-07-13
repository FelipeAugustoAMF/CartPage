import { useState, useEffect } from "react";
import { FloatButton } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import AppTabs from "./components/AppTabs";
import useCart from "./hooks/useCart";

export default function App() {
  const [tab, setTab] = useState("products");
  const cart = useCart();

  useEffect(() => {
    if (tab === "cart") {
      cart.resetNewItemCounter();
    }
  }, [tab]);

  return (
    <>
      <AppTabs activeKey={tab} onChange={setTab} cart={cart} />

      <FloatButton
        icon={<ShoppingCartOutlined />}
        badge={
          cart.newItemCounter > 0
            ? { count: cart.newItemCounter, size: "small" }
            : null
        }
        style={{ right: 30, bottom: 24, transform: "scale(1.5)" }}
        onClick={() => setTab("cart")}
      />
    </>
  );
}
