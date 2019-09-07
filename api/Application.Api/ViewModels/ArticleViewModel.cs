using System;
using System.Collections.Generic;
using Domains.Article;

namespace Application.Api.ViewModels
{
  public class ArticleViewModel
  {
    public string Id { get; set; }
    public string SubmissionId { get; set; }
    public string Modality { get; set; }
    public string Title { get; set; }
    public string Resume { get; set; }
    public Author PrimaryAuthor { get; set; }
    public DateTime StartDate { get; set; }
    public EApresentationType Type { get; set; }
    public string Building { get; set; }
    public string Room { get; set; }
    public string EvaluatorId { get; set; }
    public string Evaluator2Id { get; set; }
  }
}
