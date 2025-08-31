# STAGE 1: Compilación
# Usa una imagen de Node.js con un sistema operativo ligero para la construcción.
# Ahora usamos la etiqueta '22-alpine' para mayor seguridad y actualizaciones automáticas.
FROM node:22-alpine AS build

# Establece el usuario no-root 'node' por motivos de seguridad.
USER node

# Establece el directorio de trabajo dentro del contenedor.
WORKDIR /app

# Copia los archivos de configuración de dependencias para aprovechar la caché de Docker.
COPY --chown=node:node package*.json ./

# Instala las dependencias. Esta capa se almacena en caché y no se vuelve a ejecutar
# a menos que los archivos package*.json cambien.
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor.
COPY --chown=node:node . .

# Combina el paso de construcción en una sola capa.
RUN npm run build

# STAGE 2: Servidor de producción
# Usa una imagen de Nginx, que es un servidor web muy rápido y liviano.
FROM nginx:alpine

# Crea los directorios de caché y asigna el propietario a 'nginx'.
# Esto se hace como el usuario predeterminado (root) para tener los permisos necesarios.
RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R nginx:nginx /var/cache/nginx

# Copia nuestro archivo de configuración personalizado.
# La ruta de destino es la ubicación por defecto de la configuración de Nginx.
COPY nginx.conf /etc/nginx/nginx.conf

# Asigna el usuario no-root 'nginx' que ya existe en la imagen.
USER nginx

# Copia los archivos estáticos generados en la etapa de compilación.
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Expone el puerto 80 del contenedor, que es el puerto predeterminado de Nginx.
EXPOSE 80

# Anula el script de entrada predeterminado y ejecuta Nginx directamente
# con nuestra configuración y el modo de apagado.
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]
