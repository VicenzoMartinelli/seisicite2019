using Domain.Core.Enumerators;
using Domain.Core.Notifications;
using Domain.Domains.Article;
using Domain.Interfaces;
using Infra.Data.MongoIdentityStore;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Services.Seisicite.Api.Commands;
using System.Threading;
using System.Threading.Tasks;

namespace Services.Seisicite.Api.CommandHandlers
{
  public class ApproveEvaluatorCommandHandler : IRequestHandler<ApproveEvaluatorCommand, bool>
  {
    private readonly IRepository _repository;
    private readonly NotificationContext _notificationContext;

    public ApproveEvaluatorCommandHandler(
      IRepository repository,
      NotificationContext notificationContext)
    {
      _repository = repository;
      _notificationContext = notificationContext;
    }

    public async Task<bool> Handle(ApproveEvaluatorCommand request, CancellationToken cancellationToken)
    {
      var user = await _repository.GetByIdAsync<Person>(request.UserId);

      if (user == null)
      {
        _notificationContext.PushNotification(ReturnCode.RegistroNaoEncontrado);
        return false;
      }

      user.Approved = true;

      await _repository.UpdateAsync(user, user.Id);

      return true;
    }

  }
}
