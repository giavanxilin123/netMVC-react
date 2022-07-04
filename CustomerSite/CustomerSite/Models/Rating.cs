namespace CustomerSite.Models
{
    public class Rating
    {
        public int RatingId {get; set;} 
        // public int UserId { get; set; }

        public int UserId {get; set;} = 1;

        public Product Product {get; set;} = new Product {
            Id = 0,
            Name = "string",
            ImagePath = "string",
            Categories = "string",
            Description= "string",
            Stock = 0,
            Price = 0,
            Created = new DateTime(),
            Updated = new DateTime(),
        };
        public int Score {get; set;}

        public string Comment {get; set;} = "Ngon!";
    }
}