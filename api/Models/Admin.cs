using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Admin
    {
        [Key]
        public int Id {get; set;}
        
        public string Name {get; set;}

        public DateTime Created {get; set;}

        public DateTime Updated {get; set;}

        [Required]
        public string Role {get; set;}
        
        public int Age {get; set;}
        
        public string PhoneNumber {get; set;}
    }
}