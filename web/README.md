# 🔗 **Brev.ly Web**

---

## 📘 **Sobre o Projeto**

O **Brev.ly** é uma aplicação FullStack para o gerenciamento de links encurtados. Ela permite o cadastro, listagem e remoção de links encurtados, geração de relatório dos acessos de cada link e também o redirecionamento correto do link encurtado para o link original. A seguir, temos um detalhamento sobre o que é preciso para executar o front-end da aplicação.

---

## 📂 **Arquitetura dos Diretórios**

A estrutura de pastas do projeto está organizada da seguinte forma:

```
web/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── http/
│   ├── interfaces/
│   ├── pages/
│   ├── store/
│   ├── App.tsx
│   ├── global.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🛠️ **Pré-requisitos**

Antes de começar, certifique-se de ter os seguintes pré-requisitos instalados:

- [Node.js](https://nodejs.org/) (versão 23.x ou superior)
- [pnpm](https://pnpm.io/installation)
- Um editor de código, como [Visual Studio Code](https://code.visualstudio.com/)

---

## ⚙️ **Instalando Dependências**

Siga os passos abaixo para configurar o ambiente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/basilioarth/Brev.ly.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd Brev.ly/web
   ```

3. Instale as dependências:
   ```bash
   pnpm install
   ```
---

## 🚀 **Iniciando a Aplicação**

Para iniciar a aplicação, execute o seguinte comando:

```bash
pnpm run start
```

A aplicação estará disponível em `http://localhost:4173/`. Para utilizá-la plenamente, certifique-se de que o back-end está executando corretamente. Para isso, siga as instruções contidas em `Brev.ly/server/README.md`.

---

### 🎉 Conclusão

Parabéns! Agora você está pront@ para explorar o front-end do **Brev.ly** 💻✨.