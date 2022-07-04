using System;
using System.ComponentModel.DataAnnotations;
namespace api.Models
{
    public class User
    {
        [Key]       
        public string Username {get; set;}

        public string? Name { get; set; }

        public int? Age { get; set; }

        public byte[] PasswordHash {get; set;}

        public byte[] PasswordSalt {get; set;}
    }
}