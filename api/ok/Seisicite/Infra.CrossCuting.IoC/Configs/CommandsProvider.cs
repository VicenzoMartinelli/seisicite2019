using Application.Api.CommandHandlers;
using Application.Api.Commands;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Infra.Ioc.Configs
{
  public static class CommandsProvider
  {
    public static void AddCommandsServices(this IServiceCollection services)
    {
      services.AddScoped<IRequestHandler<ImportArticlesCommand, bool>, ImportArticlesCommandHandler>();
    }
  }
}
