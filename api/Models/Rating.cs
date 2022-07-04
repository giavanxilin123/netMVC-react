using System;
using System.ComponentModel.DataAnnotations;
namespace api.Models
{
    public class Rating
    {
        [Key]
        public int RatingId {get; set;}
        // public int UserId { get; set; }

        public int UserId {get; set;}

        public Product Product {get; set;}
        public int Score {get; set;}

        public string Comment {get; set;}
    }
}