using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domains.Article
{
    public class Article
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public EEventIdentifier Event { get; set; }
        public EAssessmentStatus AssessmentStatus { get; set; }
        public EApresentationType ApresentationType { get; set; }
        public string SubmissionId { get; set; }
        public string Title { get; set; }
        public string Resume { get; set; }
        public Author PrimaryAuthor { get; set; }
        public Author SecundaryAuthor { get; set; }
        public string Modality { get; set; }
        public string Language { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Building { get; set; }
        public string Room { get; set; }
        public string LocalDetails { get; set; }
        public string DirectorDecision { get; set; }
        public string Situation { get; set; }
    }
}