namespace CustomerSite.Models
{
    public class Rating
    {
        public int RatingId {get; set;} 
        // public int UserId { get; set; }

        public User User {get; set;} 

        public Product Product {get; set;} = new Product {
            Id = 0,
            Name = "string",
            ImagePath = "string",
            Category = new Category{
                Id = 0,
                Name = "string",
                Created = new DateTime(),
                Updated = new DateTime()
            },
            Description= "string",
            Stock = 0,
            Price = 0,
            Created = new DateTime(),
            Updated = new DateTime(),
        };
        public int Score {get; set;}

        public string Comment {get; set;} = "Ngon!";
        public DateTime Created {get; set;}

        public DateTime Updated {get; set;}
    }
}