using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Category
    {
       [Key]
       public string Name  {get; set;}

       public DateTime Created {get; set;}

       public DateTime Updated {get; set;}
    }
}