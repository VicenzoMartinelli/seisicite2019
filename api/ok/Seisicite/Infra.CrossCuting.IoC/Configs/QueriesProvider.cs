using Application.Api.Queries;
using Application.Api.QueryHandlers;
using Application.Api.ViewModels;
using Domains.Article;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infra.Ioc.Configs
{
  public static class QueriesProvider
  {
    public static void AddQueriesServices(this IServiceCollection services)
    {
      services.AddScoped<IRequestHandler<ListArticlesPaginatedByEventQuery, ArticleViewModel>, ListArticlesPaginatedByEventQueryHandler>();
      services.AddScoped<IRequestHandler<ListAvaliadoresByEventoQuery, List<AvaliadorViewModel>>, ListAvaliadoresByEventoQueryHandler>();
    }
  }
}
