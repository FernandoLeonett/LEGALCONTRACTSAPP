# STAGE 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["LegalContracts.sln", "."]
COPY ["API/API.csproj", "API/"]
COPY ["Core/Core.csproj", "Core/"]
COPY ["Data/Data.csproj", "Data/"]
COPY ["Tests/Tests.csproj", "Tests/"]

RUN dotnet restore "LegalContracts.sln"

COPY . .
WORKDIR "/src/API"
RUN dotnet build "API.csproj" -c Release -o /app/build

# STAGE 2: Publish
FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# STAGE 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

ARG BACKEND_PORT_CONTAINER=5166
ENV ASPNETCORE_URLS=http://+:${BACKEND_PORT_CONTAINER}
ENV DOTNET_ENVIRONMENT=Production

RUN mkdir -p /app/db
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "API.dll"]
EXPOSE ${BACKEND_PORT_CONTAINER}
