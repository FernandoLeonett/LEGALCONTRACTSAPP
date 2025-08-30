

using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class MigrationExtensions
{
    public static void UseDatabaseMigration(this IApplicationBuilder app)
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();
        IServiceProvider services = scope.ServiceProvider;
        AppDbContext context = services.GetRequiredService<AppDbContext>();
        context.Database.Migrate();
    }
}
