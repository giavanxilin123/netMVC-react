using System;
using System.ComponentModel.DataAnnotations;

namespace CustomerSite.Models
{
    public class Category
    {
        [Key]
        public int Id {get; set;}
        public DateTime Created {get; set;}
        public DateTime Updated {get; set;}
        public string Name  {get; set;}
    }
}