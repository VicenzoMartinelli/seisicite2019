using Application.Api.Commands;
using Application.Api.Queries;
using Application.Api.QueryHandlers;
using Application.Api.ViewModels;
using Domain.Core.Notifications;
using Domains.Article;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
  [Route("articles")]
  [ApiController]
  [Authorize]
  public class ArticlesController : BaseApiController
  {
    public ArticlesController(IMediator mediator, NotificationContext notificationContext) : base(mediator, notificationContext)
    { }

    [HttpGet("{evento}")]
    public async Task<IActionResult> GetArticlesBySituacao(EEventIdentifier evento, [FromQuery] int page)
    {
      var value = await _mediator.Send(new ListArticlesPaginatedByEventQuery()
      {
        Event = evento,
        Page = page
      });

      return await ResponseOkAsync(value);
    }

    [HttpGet("avaliadores/{evento}")]
    public async Task<IActionResult> GetAvaliadores(EEventIdentifier evento)
    {
      var value = await _mediator.Send(new ListAvaliadoresByEventoQuery()
      {
        Event = evento
      });

      return await ResponseOkAsync(value);
    }
  }
}
