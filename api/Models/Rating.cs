using System;
using System.ComponentModel.DataAnnotations;
namespace api.Models
{
    public class Rating
    {
        [Key]
        public int RatingId {get; set;}
        // public int UserId { get; set; }

        public User User {get; set;}

        public Product Product {get; set;}

        public int Score {get; set;}

        public string Comment {get; set;}

        public DateTime Created {get; set;}

        public DateTime Updated {get; set;}
    }
}