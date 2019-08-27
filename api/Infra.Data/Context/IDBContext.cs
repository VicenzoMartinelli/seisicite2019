using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infra.Data.Context
{
  public interface IDBContext
  {
    IMongoDatabase GetDatabase(string connectionString);
  }
}
