# STAGE 1: Compilación
# Usa una imagen de SDK de .NET para compilar la aplicación.
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG configuration=Release
WORKDIR /src

# Copia los archivos de los proyectos de la solución y restaura las dependencias para aprovechar la caché.
COPY ["LegalContracts.sln", "."]
COPY ["API/API.csproj", "API/"]
COPY ["Core/Core.csproj", "Core/"]
COPY ["Data/Data.csproj", "Data/"]
COPY ["Tests/Tests.csproj", "Tests/"]
RUN dotnet restore "LegalContracts.sln"

# Copia el resto de los archivos y compila la aplicación en modo 'Release'.
COPY . .
WORKDIR "/src/API"
RUN dotnet build "API.csproj" -c $configuration -o /app/build

# STAGE 2: Publicación
FROM build AS publish
ARG configuration=Release
RUN dotnet publish "API.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

# STAGE 3: Imagen final (más ligera)
# Usa la imagen de tiempo de ejecución de .NET.
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 5166

# Configura la URL del contenedor.
ENV ASPNETCORE_URLS=http://+:5166
ENV ASPNETCORE_ENVIRONMENT=Development

# Copia los archivos publicados desde la etapa de 'publish'.
COPY --from=publish /app/publish .

# Define el punto de entrada del contenedor.
ENTRYPOINT ["dotnet", "API.dll"]
