using System.Collections.Generic;
using Application.Api.ViewModels;
using Domains.Article;
using MediatR;

namespace Application.Api.Queries
{
  public class ListArticlesPaginatedByEventQuery : IRequest<ArticleViewModel>
  {
    public EEventIdentifier Event { get; set; }

    public int Page { get; set; }

    public int PageSize { get; set; } = 9;
  }
}