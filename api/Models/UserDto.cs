using System;
using System.ComponentModel.DataAnnotations;
namespace api.Models
{
    public class UserDto
    {
        public string Username {get; set;}
        public string Password {get; set;}
        public int Age {get; set;}
        public string Name {get; set;}
    }
}