using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    public class ProductDto
    {
        public int Id {get; set;}

        public int CategoryId {get; set;}

        public string Name { get; set; }
		
		public int Stock { get; set; }

        [Column(TypeName = "money")]
		public int Price { get; set; }

		public string ImagePath {get; set;}

        public string Description {get; set;}

        public DateTime Created {get; set;}

        public DateTime Updated {get; set;}
        
    }
}