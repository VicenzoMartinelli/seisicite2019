using Domain.Core.Notifications;
using Infra.Auth.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
  [Route("auth")]
  public class AuthController : BaseApiController
  {
    public AuthController(IMediator mediator, NotificationContext notificationContext) : base(mediator, notificationContext)
    {
    }

    /// <summary>
    /// Método é responsável pela criação do usuário para acesso à api. 
    /// </summary>
    /// <param name="registerUser">Dados para criação do usuário</param>
    /// <returns></returns>
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterUserCommand registerUser)
    {
      var result = await _mediator.Send(registerUser);

      if (result == null)
      {
        return await ResponseNotificationsAsync();
      }

      return await ResponseOkAsync(result);
    }

    /// <summary>
    /// Método responsável pela autenticação do usuário e retorno do token.
    /// </summary>
    /// <param name="login">Dados do login do usuário</param>
    /// <returns></returns>
    [HttpPost("login")]
    public async Task<IActionResult> LogInAsync([FromBody] LoginCommand login)
    {
      var result = await _mediator.Send(login);

      if (result == null)
      {
        return await ResponseNotificationsAsync();
      }

      return await ResponseOkAsync(result);
    }
  }
}
