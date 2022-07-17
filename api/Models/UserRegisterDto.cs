using System;
using System.ComponentModel.DataAnnotations;
namespace api.Models
{
    public class UserRegisterDto
    {
        [Key]
        public string Username {get; set;}  
        public string Password {get; set;}
        public string Name {get; set;}

    }
}