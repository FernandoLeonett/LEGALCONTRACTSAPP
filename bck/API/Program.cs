using API;
using API.Extensions;
using Scalar.AspNetCore;
using Serilog;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Configurar servicios
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

// Configuraci�n de la documentaci�n de la API usando el m�todo de extensi�n
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

// Habilitar la visualizaci�n de la documentaci�n solo en desarrollo.
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
