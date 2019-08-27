using Microsoft.AspNetCore.Builder;

namespace WebApi.Configs
{
  public static class CorsConfig
  {
    public static void AddCorsConfig(this IApplicationBuilder app)
    {
      app.UseCors(c =>
      {
        c.AllowAnyHeader();
        c.AllowAnyMethod();
        c.AllowAnyOrigin();
      });
    }
  }
}
