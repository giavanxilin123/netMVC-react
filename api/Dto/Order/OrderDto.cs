using api.Models;
namespace api.Dto.Order
{
    public class OrderDto
    {
        public string Username {get; set;}

        public List<OrderLine> OrderLine {get; set;}

        public DateTime Created {get; set;}

        public DateTime Updated {get; set;}
    }
}