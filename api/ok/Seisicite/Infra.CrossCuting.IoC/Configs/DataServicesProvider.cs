using Domain.Interfaces;
using Infra.Data.Context;
using Infra.Data.Repository;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infra.Ioc.Configs
{
  public static class DataServiceProvider
  {
    public static void AddDataServices(this IServiceCollection services)
    {
      services.AddSingleton<IDBContext, DBContext>();

      services.AddSingleton<IMongoDatabase>((x) =>
      {
        return x.GetService<IDBContext>().GetDatabase(x.GetService<IConfiguration>().GetConnectionString("MongoServer"));
      });

      services.AddSingleton<IRepository, Repository>();
      services.AddSingleton<IRepositoryArticle, RepositoryArticle>();
    }
  }
}
