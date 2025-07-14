import { Modal, Button, Form, Input, InputNumber } from "antd";
import { supabaseService } from "../services/supabaseService";

export default function ProductForm() {
  const [modal, contextHolder] = Modal.useModal();

  const onFinish = async (values) => {
    try {
      const { data, error } = await supabaseService.products.insert(values);
      if (error) throw error;
      modal.success({
        content: "Produto adicionado com sucesso!",
        title: "",
        centered: true,
      });
    } catch (error) {
      modal.error({
        content: error.message,
        title: "Não foi possível adicionar o novo produto",
        centered: true,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      {contextHolder}
      <Form
        name="product-form"
        layout="vertical"
        style={{ width: "500px" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Título"
          name="title"
          rules={[
            {
              required: true,
              message: "Por favor, dê um título para o produto",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="description"
          rules={[
            {
              required: true,
              message: "Por favor, dê uma descrição para o produto",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Preço"
          name="price"
          rules={[
            {
              required: true,
              message: "Por favor, dê um preço para o produto",
            },
          ]}
        >
          <InputNumber precision={2} min={0.1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="URL da imagem"
          name="imageUrl"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null} style={{ margin: "0 auto" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
