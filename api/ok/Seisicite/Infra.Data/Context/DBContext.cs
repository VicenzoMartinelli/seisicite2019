using System.Linq;
using MongoDB.Driver;
using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using Infra.Data.Config;

namespace Infra.Data.Context
{
  public class DBContext : IDBContext
  {
    private IMongoDatabase db;

    public IMongoDatabase GetDatabase(string connectionString)
    {
      if(db == null)
      {
        var mongoClient = new MongoClient(connectionString);

        db = mongoClient.GetDatabase("Seisicite");

        BsonSerializer.RegisterSerializer(typeof(DateTime), new BsonUtcDateTimeSerializer());
      }

      return db;
    }
  }
}