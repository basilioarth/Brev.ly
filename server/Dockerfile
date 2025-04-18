FROM node:23.11 AS base
RUN npm i -g pnpm

FROM base AS dependencies 
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build
WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod
EXPOSE 3333
CMD ["node", "--env-file", ".env", "dist/infra/http/server.mjs"]