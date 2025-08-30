using API;
using API.Extensions;
using Data.Context;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Serilog;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Host.UseSerilog((context, services, configuration) => configuration.ReadFrom.Configuration(context.Configuration).ReadFrom.Services(services).Enrich.FromLogContext());
WebApplication app = builder.Build();

app.MapOpenApi();

if (app.Environment.IsDevelopment())
{
    app.MapScalarApiReference();
}

app.MapControllers();
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Crear la base de datos si no existe con nuestro método de extensión.
app.UseDatabaseMigration();
using (IServiceScope scope = app.Services.CreateScope())
{
    IServiceProvider services = scope.ServiceProvider;
    AppDbContext context = services.GetRequiredService<AppDbContext>();
    context.Database.Migrate();
}

app.Run();
