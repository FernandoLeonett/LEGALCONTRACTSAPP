using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class MigrationExtensions
{
    // Esta va para producción o entornos donde aplicamos migraciones
    public static void ApplyDatabaseMigrations(this IApplicationBuilder app)
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();
        IServiceProvider services = scope.ServiceProvider;
        AppDbContext context = services.GetRequiredService<AppDbContext>();

        try
        {
            if (context.Database.GetPendingMigrations().Any())
            {
                context.Database.Migrate();
            }
        }
        catch
        {
            // Loguear error o manejarlo según convenga
            throw;
        }
    }



    /// <summary>
    /// Solo para desarrollo: asegura que la carpeta y la DB existan antes de usarla.
    /// La carpeta se crea en la raíz del proyecto.
    /// </summary>
    public static void EnsureDatabaseCreated(this IApplicationBuilder app)
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();
        IServiceProvider services = scope.ServiceProvider;
        AppDbContext context = services.GetRequiredService<AppDbContext>();

        try
        {
            // Carpeta db en la raíz del proyecto
            string dbFolder = Path.Combine(Directory.GetCurrentDirectory(), "db");

            if (!Directory.Exists(dbFolder))
            {
                _ = Directory.CreateDirectory(dbFolder);
            }

            // Asegura la creación de la DB
            _ = context.Database.EnsureCreated();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error al crear la base de datos: {ex.Message}");
            throw;
        }
    }


}