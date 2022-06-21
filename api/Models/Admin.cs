using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Admin
    {
        public int Id {get; set;}
        [Required]

        public string Name {get; set;}

        public DateTime Created {get; set;}

        public string Role {get; set;}
        [Required]

        public int Age {get; set;}
        
        public string PhoneNumber {get; set;}
    }
}