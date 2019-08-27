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
using MongoDB.Driver;

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
      var filterObj = request.Event == EEventIdentifier.Sei ? 
          Builders<MongoIdentityUser>.Filter.Eq(x => x.IsSei, true) :
          Builders<MongoIdentityUser>.Filter.Eq(x => x.IsSicite, true);

      var items = await _repository.GetByFilter(filterObj, "users");

      return items.Select(x => new AvaliadorViewModel()
      {
        Id = x.Id,
        Name = x.Name
      }).ToList();
    }
  }
}
