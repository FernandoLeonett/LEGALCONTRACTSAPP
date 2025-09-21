# LegalContractsApp

Una aplicación **full-stack** para la gestión de contratos, con **API RESTful en .NET 9.0** y frontend **React + TypeScript**.  
El proyecto se centra en **modularidad y buenas prácticas**, usando:

- **Arquitectura por capas:** presentación → lógica de negocio → acceso a datos.
- **Patrón Repository:** abstrae la persistencia de datos.
- **Principios SOLID** y **Single Responsibility:** cada clase tiene una sola responsabilidad, mejorando claridad y testabilidad.

---

## 💻 Backend (C# | .NET 9.0)

- **Base de datos:** SQLite + EF Core.
- **Documentación:** OpenAPI + Scalar.
- **Arquitectura:** Modular, con patrón Repository.
- **Pruebas:** xUnit, Moq y FluentAssertions.
- **Endpoints CRUD:** `GET`, `POST`, `PUT`, `DELETE` para contratos.

---

## ⚛️ Frontend (React + TypeScript)

- **Entorno de desarrollo:** Vite.
- **UI moderna y responsiva:** modales, notificaciones y loaders.
- **Funcionalidades:** CRUD completo, filtrado y ordenamiento.
- **Pruebas:** una prueba unitaria con Jest + React Testing Library.

---

## ⚙️ Requisitos

- Visual Studio 2022+
- .NET 9.0 SDK
- Node.js 20+
- Docker (opcional, recomendado)

---

🌱 Configuración de variables de entorno

Antes de ejecutar la aplicación, crea los archivos .env en las carpetas bck y web:

Backend (bck/.env)
DOTNET_ENVIRONMENT=Development
BACKEND_PORT_HOST=5167
BACKEND_PORT_CONTAINER=5166

Frontend (web/.env)
VITE_API_URL=http://localhost:5167/api
VITE_PORT=4200

Estos valores son los predeterminados; puedes modificarlos según tus necesidades de puerto o entorno.

---

## 🐳 Ejecución con Docker

Levanta **backend, frontend y base de datos** con un solo comando:

```bash
docker-compose up --build
Backend: http://localhost:5167

Frontend: http://localhost:4200

Para detener los contenedores:


docker-compose down
```

## 🤷‍♂️ Ejecución Manual, sin Docker

```bash

Backend – Ejecutar la API
Primero entra en la carpeta del backend, restaura las dependencias y levanta el servidor:

cd bck # Entrar en la carpeta del backend
dotnet restore # Restaurar dependencias de .NET
dotnet run # Iniciar la API en modo desarrollo
El backend estará disponible en: http://localhost:5167

Frontend – Ejecutar la interfaz
Luego entra en la carpeta del frontend, instala dependencias y levanta el servidor de desarrollo:

cd web # Entrar en la carpeta del frontend
npm install # Instalar dependencias de Node
npm run dev -- --open # Iniciar la app y abrirla en el navegador
El frontend estará disponible en: http://localhost:4200

🧪 Ejecutar Pruebas
Backend
Para correr las pruebas unitarias del backend:

cd bck
dotnet test # Ejecuta todas las pruebas definidas

🧑‍💻 Autor
Fernando Leonett

```
