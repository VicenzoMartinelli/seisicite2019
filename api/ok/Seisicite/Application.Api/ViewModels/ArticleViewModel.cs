using System;
using System.Collections.Generic;
using Domains.Article;

namespace Application.Api.ViewModels
{
  public class ArticleViewModel
  {
    public List<ArticleItem> Items { get; set; }
    public int Page { get; set; }
  }

  public class ArticleItem
  {
    public string Id { get; set; }
    public string SubmissionId { get; set; }
    public string Modality { get; set; }
    public string Title { get; set; }
    public string Resume { get; set; }
    public Author PrimaryAuthor { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Building { get; set; }
    public string Room { get; set; }
  }
}
