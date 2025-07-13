import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import { Tabs } from "antd";

export default function AppTabs({ activeKey, onChange, cart }) {
  const tabItems = [
    {
      label: "Produtos",
      key: "products",
      children: <ProductsPage cart={cart} />,
    },
    {
      label: "Carrinho",
      key: "cart",
      children: <CartPage onNavigate={onChange} cart={cart} />,
    },
  ];

  return (
    <Tabs
      centered
      activeKey={activeKey}
      onChange={onChange}
      items={tabItems}
      size="large"
      tabBarGutter={28}
      destroyOnHidden={false}
    />
  );
}
