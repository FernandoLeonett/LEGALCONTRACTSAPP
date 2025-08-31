# STAGE 1: Build
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV NODE_ENV=production
RUN npm run build

# STAGE 2: Imagen final
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm install --omit=dev

EXPOSE 8080

# Hardcodeamos la URL de la API en producción
ENV VITE_API_URL=http://bck:5167/api

CMD ["npx", "vite", "preview", "--port", "8080", "--host"]
