using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Context;

public static class ModelBuilderExtensions
{
    public static void Seed(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contract>().HasData(
            new Contract
            {
                Id = new Guid("c6d0c75c-f179-436f-b258-37b0d7718e21"),
                AuthorName = "Lionel Messi",
                LegalEntityName = "FC Barcelona",
                Description = "Professional football contract with performance bonuses and image rights clauses. Includes Champions League qualification bonuses.",
                CreatedDate = new DateTime(2024, 1, 15, 10, 0, 0, DateTimeKind.Utc),
                UpdatedDate = new DateTime(2024, 2, 20, 14, 30, 0, DateTimeKind.Utc)
            },
            new Contract
            {
                Id = new Guid("d7f1c65e-a279-436f-b258-37b0d7718e22"),
                AuthorName = "Cristiano Ronaldo",
                LegalEntityName = "Al Nassr FC",
                Description = "Multi-year contract with Saudi Arabian football club. Includes ambassador roles and commercial partnerships.",
                CreatedDate = new DateTime(2024, 1, 10, 8, 15, 0, DateTimeKind.Utc),
                UpdatedDate = null
            },
            new Contract
            {
                Id = new Guid("e8a2d76f-b379-436f-b258-37b0d7718e23"), 
                AuthorName = "Kylian Mbappé",
                LegalEntityName = "Paris Saint-Germain",
                Description = "Extension contract with increased salary and release clause modifications for future transfers.",
                CreatedDate = new DateTime(2024, 2, 1, 16, 45, 0, DateTimeKind.Utc),
                UpdatedDate = new DateTime(2024, 2, 25, 11, 20, 0, DateTimeKind.Utc)
            },
            new Contract
            {
                Id = new Guid("f9a3e87b-c479-436f-b258-37b0d7718e24"), 
                AuthorName = "Neymar Jr.",
                LegalEntityName = "Paris Saint-Germain",
                Description = "Five-year contract including image rights, bonuses, and performance incentives.",
                CreatedDate = new DateTime(2024, 3, 1, 12, 0, 0, DateTimeKind.Utc),
                UpdatedDate = null
            },
            new Contract
            {
                Id = new Guid("a0b4f98c-d579-436f-b258-37b0d7718e25"), 
                AuthorName = "Erling Haaland",
                LegalEntityName = "Manchester City",
                Description = "Contract with release clause and annual performance bonuses for league and champions cup matches.",
                CreatedDate = new DateTime(2024, 3, 5, 9, 30, 0, DateTimeKind.Utc),
                UpdatedDate = null
            }
        );
    }
}
