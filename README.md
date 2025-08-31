# 📜 LegalContractsApp

Una aplicación **CRUD fullstack** que demuestra el desarrollo de un **RESTful API en .NET** y un **frontend responsivo en React + TypeScript**.
El proyecto se centra en la **modularidad**, las **mejores prácticas** y la **experiencia de desarrollador**.

![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet&logoColor=white)  
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)  
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)  
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white)

---

## 🚀 Visión General

### 💻 Backend (C# | .NET 9.0)

- **SQLite + EF Core** → Base de datos ligera, ideal para pruebas y despliegues sin dependencias externas.
- **OpenAPI + Scalar** → Documentación interactiva y autoexplorable de la API.
- **Serilog** → Logging estructurado para trazabilidad y debugging.
- **Arquitectura modular** → separación clara por capas.

### ⚛️ Frontend (React + TypeScript)

- Construido con **Vite** para desarrollo rápido.
- UI moderna con:
  - Modales para formularios ✍️
  - Toast notifications 🔔
  - Loader de estados de carga ⏳
  - Filtrado y ordenamiento (autor, fecha, entidad) 🔎
  - Página 404 personalizada 🚫

### 🧪 Testing

- **xUnit, Moq, FluentAssertions** → Pruebas unitarias en el backend.

### 🤖 Asistencia de IA

IA utilizada como soporte para depuración, optimización y comandos de EF.

---

## ⚙️ Requisitos Previos

- [Visual Studio 2022+](https://visualstudio.microsoft.com/)
- [.NET 9.0 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js 20+](https://nodejs.org/)

---

## 📁 Clonar el Repositorio

git clone https://github.com/FernandoLeonett/LEGALCONTRACTSAPP
cd LEGALCONTRACTSAPP

## ▶️ Ejecutar el Backend

cd bck
dotnet restore

### Configurar DB

cd API
mkdir db

(ruta de la BD definida en appsettings.json)

### Migrar DB

Desde Package Manager Console con Data como proyecto por defecto
add-migration Initial
update-database

### Ejecutar API

dotnet run

Servidor: http://localhost:5166
Documentación: Scalar UI se abre automáticamente en el navegador.

---

## 🌐 Ejecutar el Frontend

cd web
npm install

### Crear archivo .env

```env
VITE_API_URL=http://localhost:5166/api
Asignar esta variable de entorno para que el cliente React sepa la ubicación de la API.

Levantar cliente:
npm run dev -- --open
Disponible en http://localhost:8080.

✅ Ejecutar Tests
cd bck
dotnet test
🧑‍💻 Autor
👤 Fernando Leonett
🔗 GitHub
```
