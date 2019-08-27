using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace WebApi.Configs
{
  public static class SwaggerSetup
  {
    public static void AddSwaggerConfig(this IServiceCollection services)
    {
      if (services == null) throw new ArgumentNullException(nameof(services));

      services.AddSwaggerGen(s =>
      {
        s.SwaggerDoc("v1", new Info
        {
          Version     = "v1",
          Title       = "Seisicite API",
          Description = "Seisicite API",
          Contact     = new Contact
          {
            Name  = "Seisicite 2019",
            Email = "martinellivicenzo@gmail.com"
          }
        });

        try
        {
          var xmlFile = $"WebApi.xml";
          var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
          s.IncludeXmlComments(xmlPath);
        }
        catch (Exception)
        {
        }
      

        var security = new Dictionary<string, IEnumerable<string>>{ {"Bearer", new string[] { }} };

        s.AddSecurityDefinition(
            "Bearer",
            new ApiKeyScheme
            {
              In          = "header",
              Description = "Copie 'Bearer ' + token'",
              Name        = "Authorization",
              Type        = "apiKey"
            });

        s.AddSecurityRequirement(security);

        s.OrderActionsBy(x => x.ActionDescriptor.DisplayName);
      });
    }
  }
}
