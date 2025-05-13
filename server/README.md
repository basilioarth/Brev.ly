# 🔗 **Brev.ly Server**

---

## 📘 **Sobre o Projeto**

O **Brev.ly** é uma aplicação FullStack para o gerenciamento de links encurtados. Ela permite o cadastro, listagem e remoção de links encurtados, geração de relatório dos acessos de cada link e também o redirecionamento correto do link encurtado para o link original. A seguir, temos um detalhamento sobre o que é preciso para executar o back-end da aplicação.

---

## 📂 **Arquitetura dos Diretórios**

A estrutura de pastas do projeto está organizada da seguinte forma:

```
server/
├── docker/
├── src/
│   ├── app/functions
│   ├── infra/
│   ├── shared/
│   └── env.ts
├── .dockerignore
├── docker-compose.yml
├── Dockerfile
├── drizzle.config.ts
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
└── tsup.config.ts
```

---

## 🛠️ **Pré-requisitos**

Antes de começar, certifique-se de ter os seguintes pré-requisitos instalados:

- [Docker](https://www.docker.com/get-started/) (versão 27.x ou superior)

---

## ⚙️ **Instalando Dependências**

Siga os passos abaixo para configurar o ambiente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/basilioarth/Brev.ly.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd Brev.ly/server
   ```

3. Instale as dependências:
   ```bash
   pnpm install
   ```
---

## 🚀 **Iniciando a Aplicação**

Para iniciar a aplicação, execute o seguinte comando:

```bash
docker compose up -d
```

A aplicação estará disponível em `http://localhost:3333/`. A documentação pode ser acessada em `http://localhost:3333/docs`.

---

### 🎉 Conclusão

Parabéns! Agora você está pront@ para explorar o backend-end do **Brev.ly** 💻✨.