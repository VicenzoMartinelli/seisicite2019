using System.Linq;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Api.Commands;
using Application.Api.Queries;
using Domain.Interfaces;
using Domains.Article;
using MediatR;
using Application.Api.ViewModels;
using Infra.Data.MongoIdentityStore;

namespace Application.Api.QueryHandlers
{
  public class ListAvaliadoresByEventoQueryHandler : IRequestHandler<ListAvaliadoresByEventoQuery, List<AvaliadorViewModel>>
  {
    private readonly IRepository _repository;

    public ListAvaliadoresByEventoQueryHandler(IRepository repository)
    {
      _repository = repository;
    }
    public async Task<List<AvaliadorViewModel>> Handle(ListAvaliadoresByEventoQuery request, CancellationToken cancellationToken)
    {
      var query = await _repository.Query<MongoIdentityUser>(MongoIdentityUser.GetCollectionName());

      var items = (request.Event == EEventIdentifier.Sei ? query
      .Where(x => x.IsSei) : query.Where(x => x.IsSicite));

      return items.Select(x => new AvaliadorViewModel()
      {
        Id = x.Id,
        Name = x.Name
      }).ToList();
    }
  }
}
