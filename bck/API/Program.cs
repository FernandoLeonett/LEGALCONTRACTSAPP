using API;
using API.Extensions;
using Scalar.AspNetCore;
using Serilog;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Configurar servicios
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

// Configuración de la documentación de la API usando el método de extensión
builder.Services.AddOpenApiDocumentation();

// CORS debe ir **antes** de builder.Build()
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod()
    );
});

builder.Host.UseSerilog((context, services, configuration) =>
    configuration.ReadFrom.Configuration(context.Configuration)
                 .ReadFrom.Services(services)
                 .Enrich.FromLogContext()
);

WebApplication app = builder.Build();

// Middleware
app.UseCors("DevCors");

// Habilitar la visualización de la documentación solo en desarrollo.
//if (app.Environment.IsDevelopment())
//{
    app.MapOpenApi();
    app.MapScalarApiReference(options => options
        .WithTitle("Contracts API")
        .WithTheme(ScalarTheme.BluePlanet));
//}

app.MapControllers();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseDatabaseMigration();

app.Run();
