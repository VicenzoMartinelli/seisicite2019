using System.Linq;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Api.Commands;
using Application.Api.Queries;
using Domain.Interfaces;
using Domains.Article;
using MediatR;

namespace Application.Api.QueryHandlers
{
    public class ListArticlesOrderByDateQueryHandler : IRequestHandler<ListArticlesOrderByDateQuery, List<Article>>
    {
        private readonly IRepository _repository;

        public ListArticlesOrderByDateQueryHandler(IRepository repository)
        {
            _repository = repository;
        }
        public async Task<List<Article>> Handle(ListArticlesOrderByDateQuery request, CancellationToken cancellationToken)
        {
            var query = await _repository.Query<Article>();


            return query
                .Where(x => x.AssessmentStatus == request.Status)
                .OrderBy(x => x.StartDate)
                .ToList();
        }
    }
}
