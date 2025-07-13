import { Card, Button, Typography, message } from "antd";

const { Title, Paragraph, Text } = Typography;

export default function ProductCard({ product, onAdd, allowAdd }) {
  const handleAdd = async () => {
    try {
      await onAdd(product);

      message.success(`"${product.title}" adicionado ao carrinho!`);
    } catch (err) {
      message.error(
        `Falha ao adicionar "${product.title}": ${err.message || err}`
      );
    }
  };

  return (
    <Card
      hoverable
      style={{
        width: "100%",
        maxWidth: 300,
        height: 430,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
      cover={
        <div
          style={{
            width: "100%",
            height: 200,
            padding: 16,
            background: "#fafafa",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {product.imageUrl ? (
            <img
              alt={product.title}
              src={product.imageUrl}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          ) : (
            <span style={{ color: "#aaa" }}>Sem imagem</span>
          )}
        </div>
      }
    >
      <div style={{ padding: "0 16px" }}>
        <Title
          level={4}
          ellipsis={{ rows: 1 }}
          style={{ marginBottom: 8, lineHeight: "1.2em", height: "1.2em" }}
        >
          {product.title}
        </Title>
        <Paragraph
          ellipsis={{ rows: 2 }}
          style={{ marginBottom: 0, lineHeight: "1.3em", height: "5.2em" }}
        >
          {product.description}
        </Paragraph>
      </div>

      <div
        style={{
          marginTop: "auto",
          padding: 16,
          boxSizing: "border-box",
        }}
      >
        <Text
          strong
          style={{
            fontSize: 16,
            display: "block",
            textAlign: "center",
            marginBottom: "4px",
          }}
        >
          R$ {product.price.toFixed(2)}
        </Text>
        <Button type="primary" block onClick={handleAdd} disabled={!allowAdd}>
          Adicionar ao Carrinho
        </Button>
      </div>
    </Card>
  );
}
