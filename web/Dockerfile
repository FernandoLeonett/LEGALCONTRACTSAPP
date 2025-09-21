# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app

# Instala dependencias de forma reproducible
COPY package*.json ./
RUN npm ci

# Copia el resto del código
COPY . .

# Argumentos de build
ARG VITE_API_URL
ARG VITE_PORT

# Variables de entorno dentro del build
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_PORT=${VITE_PORT}

RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine
WORKDIR /app

# Copia solo lo necesario
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Solo dependencias de producción
RUN npm ci --omit=dev

# Exponer puerto
EXPOSE ${VITE_PORT}

CMD ["npx", "vite", "preview", "--host", "--port", "8080"]
