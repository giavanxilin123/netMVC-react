using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Order
    {
        [Key]
        public int Id {get; set;}

        public int UserId {get; set;}

        public List<OrderLine> OrderLine {get; set;}

        public DateTime Created {get; set;}

        public DateTime Updated {get; set;}
        
    }
}