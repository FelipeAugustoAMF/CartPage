import { List, InputNumber, Button, Typography, Empty } from "antd";

const { Text, Title } = Typography;

export default function CartPage({ cart }) {
  const { items, loading, error, updateQuantity, removeFromCart } = cart;

  const total = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  // if (loading) return <Spin size="large" style={{ margin: 24 }} />;

  // if (error)
  //   return <Alert message={error.message || String(error)} type="error" />;

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <Title
        level={2}
        style={{ textAlign: "center", color: "rgb(100, 100, 100)" }}
      >
        Carrinho
      </Title>
      {items.length === 0 ? (
        <Empty
          description="Carrinho vazio"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{
            fontSize: "20px",
            marginTop: "150px",
          }}
        />
      ) : (
        <>
          <List
            bordered
            dataSource={items}
            rowKey={(item) => item.product.id}
            renderItem={({ product, quantity }) => (
              <List.Item
                actions={[
                  <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => {
                      if (value === null) value = 1;
                      updateQuantity(product.id, value);
                    }}
                  />,
                  <Button danger onClick={() => removeFromCart(product.id)}>
                    Remover
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      style={{ width: 50, height: 50 }}
                    />
                  }
                  title={product.title}
                  description={`R$ ${product.price.toFixed(2)}`}
                />
                <Text>
                  Subtotal: R$ {(product.price * quantity).toFixed(2)}
                </Text>
              </List.Item>
            )}
          />
          <div style={{ textAlign: "right", marginTop: 16 }}>
            <Title level={4} style={{ textAlign: "left" }}>
              Total: R$ {total.toFixed(2)}
            </Title>
          </div>
        </>
      )}
    </div>
  );
}
