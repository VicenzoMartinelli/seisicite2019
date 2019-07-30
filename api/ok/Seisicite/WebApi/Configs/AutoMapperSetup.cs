using System;
using AutoMapper;
using Infra.CrossCuting.AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using WebApi;

namespace WebApi.Configurations
{
  public static class AutoMapperSetup
  {
    public static void AddAutoMapperConfig(this IServiceCollection services)
    {
      if (services == null) throw new ArgumentNullException(nameof(services));

      services.AddAutoMapper(typeof(AutoMapperConfig));

      AutoMapperConfig.RegisterMappings();
    }
  }
}