﻿using Application.Api.Commands;
using Application.Api.Queries;
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
    [Route("import-articles")]
    [ApiController]
    [Authorize]
    public class ImportArticlesController : BaseApiController
    {
        public ImportArticlesController(IMediator mediator, NotificationContext notificationContext) : base(mediator, notificationContext)
        { }

        /// <summary>
        /// Método para obter a lista de mídias ativas
        /// </summary>
        /// <returns>uma lista de mídias ativas</returns>
        [HttpGet("{status}")]
        public async Task<IActionResult> GetArticlesBySituacao(EAssessmentStatus status)
        {
            var value = await _mediator.Send(new ListArticlesOrderByDateQuery()
            {
                Status = status
            });

            return await ResponseOkAsync(value);
        }

        [HttpPost("{evvent}")]
        public async Task<IActionResult> ImportArticles(
            IFormFile file,
            EEventIdentifier evvent)
        {
            List<ArticleImport> items;

            using (StreamReader r = new StreamReader(file.OpenReadStream()))
            {
                string json = r.ReadToEnd();
                items = JsonConvert.DeserializeObject<List<ArticleImport>>(json);
            }

            var res = await _mediator.Send(new ImportArticlesCommand()
            {
                Articles = items,
                Event = evvent
            });

            return res ? await ResponseOkAsync() : await ResponseNotificationsAsync();
        }
    }
}
