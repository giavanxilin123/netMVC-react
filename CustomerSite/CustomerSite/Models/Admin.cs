namespace CustomerSite.Models
{
     public class Admin
    {
        public List<Admin> admin = new List<Admin>();
        public int Id {get; set;}

        public string Name {get; set;}

        public DateTime Created {get; set;}

        public string Role {get; set;}

        public int Age {get; set;}
        
        public string PhoneNumber {get; set;}
    }
}