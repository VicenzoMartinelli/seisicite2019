using Domain.Interfaces;
using Domains.Article;
using MongoDB.Driver;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Data.Repository
{
    public class RepositoryArticle : IRepositoryArticle
    {
        private readonly IRepository _repository;

        public RepositoryArticle(IRepository repository)
        {
            _repository = repository;
        }

        // public async Task<IList<Article>> GetByName(string filtrer)
        // {
        //   var filterObj = Builders<Article>.Filter.Eq(x => x.Name, filtrer);

        //   return await _repository.GetByFilter(filterObj);
        // }
    }
}
