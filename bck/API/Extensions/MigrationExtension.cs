using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class MigrationExtensions
{
    // Esta va para producción o entornos donde aplicamos migraciones
    public static void ApplyDatabaseMigrations(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<AppDbContext>();

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

    // Esta es solo para desarrollo: asegura que la DB exista
    public static void EnsureDatabaseCreated(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<AppDbContext>();

        try
        {
            context.Database.EnsureCreated();
        }
        catch
        {
            // Loguear error o manejarlo según convenga
            throw;
        }
    }
}
