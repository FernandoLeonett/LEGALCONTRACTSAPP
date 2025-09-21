# STAGE 1: Build
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_API_URL
ARG VITE_PORT
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_PORT=${VITE_PORT}

RUN npm run build

# STAGE 2: Runtime / Preview
FROM node:22-alpine
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev

EXPOSE ${VITE_PORT}
CMD ["npx", "vite", "preview", "--host", "--port", "8080"]
