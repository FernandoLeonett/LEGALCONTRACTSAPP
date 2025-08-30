using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Contracts",
                keyColumn: "Id",
                keyValue: new Guid("c6d0c75c-f179-436f-b258-37b0d7718e21"),
                columns: new[] { "AuthorName", "CreatedDate", "Description", "LegalEntityName", "UpdatedDate" },
                values: new object[] { "Lionel Messi", new DateTime(2024, 1, 15, 10, 0, 0, 0, DateTimeKind.Utc), "Professional football contract with performance bonuses and image rights clauses. Includes Champions League qualification bonuses.", "FC Barcelona", new DateTime(2024, 2, 20, 14, 30, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.InsertData(
                table: "Contracts",
                columns: new[] { "Id", "AuthorName", "CreatedDate", "Description", "LegalEntityName", "UpdatedDate" },
                values: new object[,]
                {
                    { new Guid("a0b4f98c-d579-436f-b258-37b0d7718e25"), "Erling Haaland", new DateTime(2024, 3, 5, 9, 30, 0, 0, DateTimeKind.Utc), "Contract with release clause and annual performance bonuses for league and champions cup matches.", "Manchester City", null },
                    { new Guid("d7f1c65e-a279-436f-b258-37b0d7718e22"), "Cristiano Ronaldo", new DateTime(2024, 1, 10, 8, 15, 0, 0, DateTimeKind.Utc), "Multi-year contract with Saudi Arabian football club. Includes ambassador roles and commercial partnerships.", "Al Nassr FC", null },
                    { new Guid("e8a2d76f-b379-436f-b258-37b0d7718e23"), "Kylian Mbappé", new DateTime(2024, 2, 1, 16, 45, 0, 0, DateTimeKind.Utc), "Extension contract with increased salary and release clause modifications for future transfers.", "Paris Saint-Germain", new DateTime(2024, 2, 25, 11, 20, 0, 0, DateTimeKind.Utc) },
                    { new Guid("f9a3e87b-c479-436f-b258-37b0d7718e24"), "Neymar Jr.", new DateTime(2024, 3, 1, 12, 0, 0, 0, DateTimeKind.Utc), "Five-year contract including image rights, bonuses, and performance incentives.", "Paris Saint-Germain", null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Contracts",
                keyColumn: "Id",
                keyValue: new Guid("a0b4f98c-d579-436f-b258-37b0d7718e25"));

            migrationBuilder.DeleteData(
                table: "Contracts",
                keyColumn: "Id",
                keyValue: new Guid("d7f1c65e-a279-436f-b258-37b0d7718e22"));

            migrationBuilder.DeleteData(
                table: "Contracts",
                keyColumn: "Id",
                keyValue: new Guid("e8a2d76f-b379-436f-b258-37b0d7718e23"));

            migrationBuilder.DeleteData(
                table: "Contracts",
                keyColumn: "Id",
                keyValue: new Guid("f9a3e87b-c479-436f-b258-37b0d7718e24"));

            migrationBuilder.UpdateData(
                table: "Contracts",
                keyColumn: "Id",
                keyValue: new Guid("c6d0c75c-f179-436f-b258-37b0d7718e21"),
                columns: new[] { "AuthorName", "CreatedDate", "Description", "LegalEntityName", "UpdatedDate" },
                values: new object[] { "John Doe", new DateTime(2024, 1, 1, 10, 0, 0, 0, DateTimeKind.Utc), "A generic contract for demonstration purposes.", "Example Inc.", null });
        }
    }
}
