using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Context
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Contract> Contracts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Llama al método de extensión para aplicar el seed.
            modelBuilder.Seed();
        }
    }
}
