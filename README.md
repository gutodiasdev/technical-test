# 🧩 Sistema de Gestão de Ativos

Este projeto é uma aplicação web desenvolvida com **Next.js** para gerenciar ativos empresariais. Ele permite listar, cadastrar, editar e excluir ativos com um formulário dinâmico que se adapta de acordo com a categoria do ativo.

---

## ✅ Funcionalidades Implementadas

### 📄 1. Listagem de Ativos
- Tabela paginada no servidor com:
  - Ordenação por colunas (nome, categoria, status).
  - Filtros por nome, categoria e status.
  - Paginação dinâmica (próxima e anterior).
- Destaque visual para ativos com status **"Em manutenção"** ou **"Inativo"**.

### 📝 2. Formulário Dinâmico para Cadastro
- Campos exibidos de forma dinâmica conforme a categoria do ativo:
  - **Campos comuns:** Nome, Categoria, Status, Descrição, Data de aquisição.
  - **Equipamento:** Número de série, Fornecedor.
  - **Veículo:** Placa.
  - **Software:** Chave de licença, Validade da licença.
- Validação feita com **Zod** para:
  - Nome, categoria, status e data de aquisição (obrigatórios).
- Atualização dos campos ao trocar a categoria.

### ✏️ 3. Edição de Ativos
- Permite editar ativos existentes.
- Formulário adaptado conforme a categoria.

### 🗑 4. Exclusão de Ativos
- Confirmação antes da exclusão.
- Alerta visual de sucesso ou erro.

---

## 🛠 Tecnologias Utilizadas

- **Next.js (App Router)**
- **TypeScript**
- **Styled Components**
- **React Hook Form**
- **Zod** (validação)
- **React Query**
- **JSON Server** (mock de backend)
- **Jest + React Testing Library** (testes unitários)
- **pnpm** (gerenciador de pacotes)

> ❌ O Storybook **não** foi implementado.

---

## ⚙️ Como rodar o projeto

Certifique-se de ter o **pnpm** instalado. Se não tiver, instale com:

```bash
npm install -g pnpm
```
Em seguida instale os pacotes do projeto:

```bash
pnpm install
```
Agora, há 2 passos que você precisa seguir na ordem indicada:

Passo 1: Abra um terminal e execute o comando abaixo

```bash
pnpm start:db
```
Passo 2: Abra um segundo terminal e execute o comando abaixo

```bash
npm dev
```

Pronto, o projeto está rodando. Utilize o email ```admin@email.com``` e a senha ```admin``` para entrar na aplicação.

## 🧪 Testes

A aplicação possui uma série de testes que garantem o bom funcionamento de seus componentes, após a instalação do pnpm
execute o comando em um terceiro terminal:
 
```bash
pnpm test
```

Você verá a lista de testes realizados.

## ⚙️ Algumas melhorias para o futuro
1. Possibilidade de cadastro de usuário;
2. Melhor gestão de paginação;
3. Adoção de um banco de dados mais robusto;
4. Centralizar gestão de paginação apenas em um componente;
5. Ajustar o layout shift