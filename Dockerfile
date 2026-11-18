# syntax=docker/dockerfile:1
# Front em produção local: build do Vite servido pelo nginx.
# VITE_API_URL é lida no build (vai para o navegador): nunca ponha segredo nela.
FROM node:22-bookworm-slim AS build
WORKDIR /app

# Dependências primeiro: a camada só é refeita quando o package-lock.json muda.
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
ARG VITE_API_URL=http://localhost:8000
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:1.28-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
