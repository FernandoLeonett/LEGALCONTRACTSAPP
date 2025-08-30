using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Context;

public static class ModelBuilderExtensions
{
    public static void Seed(this ModelBuilder modelBuilder)
    {
        // Usar un Guid estático para los datos de prueba
        modelBuilder.Entity<Contract>().HasData(
            new Contract
            {
                Id = new Guid("c6d0c75c-f179-436f-b258-37b0d7718e21"),
                AuthorName = "John Doe",
                LegalEntityName = "Example Inc.",
                Description = "A generic contract for demonstration purposes.",
                CreatedDate = new DateTime(2024, 1, 1, 10, 0, 0, DateTimeKind.Utc), // Usar una fecha y hora estáticas
                UpdatedDate = null
            }
        );
    }
}
