# STAGE 1: Compilación
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copia proyectos y restaura dependencias
COPY ["LegalContracts.sln", "."]
COPY ["API/API.csproj", "API/"]
COPY ["Core/Core.csproj", "Core/"]
COPY ["Data/Data.csproj", "Data/"]
COPY ["Tests/Tests.csproj", "Tests/"]
RUN dotnet restore "LegalContracts.sln"

# Copia todo y compila
COPY . .
WORKDIR "/src/API"
RUN dotnet build "API.csproj" -c Release -o /app/build

# STAGE 2: Publicación
FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# STAGE 3: Imagen final
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
EXPOSE 5166
ENV ASPNETCORE_URLS=http://+:5166

# Crear carpeta para SQLite
RUN mkdir -p /app/db

# Copiar publicación
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "API.dll"]
