using System;
using System.ComponentModel.DataAnnotations;
namespace api.Models
{
    public class UserDto
    {
        [Key]
        public string Username {get; set;}
        public string Password {get; set;}
        public DateTime Created {get; set;}
        public DateTime Updated {get; set;}
        public int Age {get; set;}
        public string Name {get; set;}

        public string Address {get;set;}

        public string PhoneNumber {get;set;}
    }
}