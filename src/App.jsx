import { useState, useEffect } from "react";
import { FloatButton, Tooltip, Modal, Typography } from "antd";
import { ShoppingCartOutlined, PlusOutlined } from "@ant-design/icons";
import AppTabs from "./components/AppTabs";
import useCart from "./hooks/useCart";
import ProductForm from "./components/ProductForm";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
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

      <Tooltip title="Insira um novo produto no banco de dados">
        <FloatButton
          type="primary"
          icon={<PlusOutlined />}
          style={{
            right: 30,
            top: 24,
            transform: "scale(1.2)",
          }}
          onClick={() => setModalOpen(true)}
        />
      </Tooltip>

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={700}
        title={<Typography.Title level={3}>Inserir produto</Typography.Title>}
        style={{ textAlign: "center" }}
        footer={null}
        destroyOnHidden={true}
      >
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <div>Insira um novo produto no banco de dados.</div>
          <div>
            Uma vez adicionado, você pode procurar por este produto e
            adicioná-lo ao carrinho
          </div>
        </div>
        <ProductForm />
      </Modal>

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
