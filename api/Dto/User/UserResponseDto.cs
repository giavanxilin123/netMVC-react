namespace api.Dto.User
{
    public class UserResponseDto
    {
        public string Username {get; set;}  
        
        public string Name {get; set;} 

        public int? Age {get; set;}

        public string PhoneNumber {get; set;}

        public string Address {get; set;}

        public DateTime? Created {get; set;}

        public DateTime? Updated {get; set;}
    }
}