using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Api.Commands;
using Domain.Interfaces;
using Domains.Article;
using MediatR;

namespace Application.Api.CommandHandlers
{
    public class ImportArticlesCommandHandler: IRequestHandler<ImportArticlesCommand, bool>
    {
        private IRepository _repository;

        public ImportArticlesCommandHandler(IRepository repository)
        {
            _repository = repository;
        }
        public async Task<bool> Handle(ImportArticlesCommand request, CancellationToken cancellationToken)
        {
            var tasks = new List<Task>();

            foreach (var item in request.Articles)
            {
                tasks.Add(_repository.AddAsync(new Article{
                     SubmissionId         = item.IdDaSubmissão.ToString(),
                     ApresentationType    = EApresentationType.Present,
                     AssessmentStatus     = EAssessmentStatus.Opened,
                     Event                = request.Event,
                     Building             = item.Prédio,
                     StartDate            = string.IsNullOrEmpty(item.DataDeInício) ? new DateTime(2019, 11, 11) : Convert.ToDateTime(item.DataDeInício),
                     EndDate              = string.IsNullOrEmpty(item.DataDeTérmino) ? new DateTime(year: 2019, month: 11, day: 13) : Convert.ToDateTime(item.DataDeTérmino),
                     DirectorDecision     = item.DecisãoDoDiretor,
                     Language             = item.Idioma,
                     Modality             = item.TítuloDaModalidade,
                     Resume               = item.Resumo,
                     Room                 = item.Sala,
                     Situation            = item.Situação,
                     Title                = item.Título,
                     PrimaryAuthor = new Author(){
                         BibliographySummary    = item.ResumoDaBiografiaAutor1,
                         Country                = item.PaísAutor1,
                         FirstName              = item.PrenomeAutor1,
                         MiddleName             = item.NomeDoMeioAutor1,
                         LastName               = item.SobrenomeAutor1,
                         Email                  = item.EMailAutor1,
                         Institution            = item.InstituiçãoAutor1,
                         PageUrl                = item.UrlAutor1
                     },
                     SecundaryAuthor = string.IsNullOrEmpty(item.SobrenomeAutor2) ? null : new Author{
                         BibliographySummary    = item.ResumoDaBiografiaAutor2,
                         Country                = item.PaísAutor2,
                         FirstName              = item.PrenomeAutor2,
                         MiddleName             = item.NomeDoMeioAutor2,
                         LastName               = item.SobrenomeAutor2,
                         Email                  = item.EMailAutor2,
                         Institution            = item.InstituiçãoAutor2,
                         PageUrl                = item.UrlAutor2
                     }
                }));
            }

            await Task.WhenAll(tasks);

            return true;
        }
    }
}
