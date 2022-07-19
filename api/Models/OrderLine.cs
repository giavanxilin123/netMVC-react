using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class OrderLine
    {
        [Key]
        public int Id {get; set;}

        public int ProductId {get; set;}

        public int Number {get; set;}
        
    }
}