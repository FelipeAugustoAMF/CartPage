# O que é esta aplicação?

Esta é uma aplicação simples que permite buscar por produtos e adicionar produtos a um carrinho. Seu propósito principal é demonstrar o uso de APIs para integração.
O front-end é feito com React e Vite como ferramenta de build. Para o back-end, foi utilizado o supabase.  


## Pré-requisitos

- Node.js
- Conta no [Supabase](https://supabase.com) (você pode criar uma gratuitamente!)

## Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/FelipeAugustoAMF/CartPage.git
cd CartPage
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` na raiz do projeto com as variáveis do Supabase:

```env
VITE_SUPABASE_URL=URLdoSupabase
VITE_SUPABASE_ANON_KEY=ChaveAnonimaDoSupabase
```

Rode o projeto em desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em [http://localhost:5173](http://localhost:5173).