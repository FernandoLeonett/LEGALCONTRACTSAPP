
namespace API.Extensions;

public static class OpenApiExtensions
{
    // Método de extensión para configurar la documentación de OpenAPI
    public static void AddOpenApiDocumentation(this IServiceCollection services)
    {
        services.AddOpenApi(options =>
        {
            options.AddDocumentTransformer((document, context, cancellationToken) =>
            {
                document.Info = new()
                {
                    Title = "API de Contratos Legales",
                    Version = "1.0.0",
                    Description = "Una API para gestionar contratos legales y documentos relacionados.",
                    Contact = new()
                    {
                        Email = "contacto@legalcontracts.com",
                        Name = "Equipo LegalContracts",
                        Url = new Uri("https://legalcontracts.com/support")
                    }
                };
                return Task.CompletedTask;
            });
        });
    }
}
