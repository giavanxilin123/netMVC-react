using System;
using System.ComponentModel.DataAnnotations;
namespace api.Models
{
    public class User
    {
        [Key]
        [Required]  
        public string Username {get; set;}  
        public DateTime? Created {get; set;}
        public DateTime? Updated {get; set;}
        public string Name { get; set; }

        public int? Age { get; set; }

        public string? PhoneNumber {get; set;}

        public string? Address {get;set;}

        public byte[] PasswordHash {get; set;}

        public byte[] PasswordSalt {get; set;}
    }
}