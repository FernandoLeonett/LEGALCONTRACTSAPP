

using Core.Interfaces;
using Core.Services;
using Data.Context;
using Data.Repostiories;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Configura la inyección de dependencias para los repositorios y servicios.
            services.AddScoped<IContractRepository, ContractRepository>();
            services.AddScoped<IContractService, ContractService>();
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));
        }
    }
}
    