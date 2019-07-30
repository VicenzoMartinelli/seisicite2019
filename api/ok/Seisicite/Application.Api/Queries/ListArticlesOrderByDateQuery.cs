using System.Collections.Generic;
using Domains.Article;
using MediatR;
   
namespace Application.Api.Queries
{
    public class ListArticlesOrderByDateQuery : IRequest<List<Article>>
    {
    	public EAssessmentStatus Status { get; set; }
    }
}