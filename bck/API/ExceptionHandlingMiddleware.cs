using System.Net;
using System.Text.Json;


namespace API
{
    public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        private readonly RequestDelegate _next = next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger = logger;

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
     
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

   
            _logger.LogError(exception, "An unhandled exception has occurred: {message}", exception.Message);

            string result = JsonSerializer.Serialize(new { error = "An unexpected error occurred. Please try again later." });

            return context.Response.WriteAsync(result);
        }
    }
}
