namespace CustomerSite.Models
{
    public class RatingDto
    {
        public int RatingId {get; set;}
        // public int UserId { get; set; }

        public string Username {get; set;}

        public int ProductId {get; set;}

        public int Score {get; set;}

        public string Comment {get; set;}

        public DateTime Created {get; set;}

        public DateTime Updated {get; set;}
    }
}