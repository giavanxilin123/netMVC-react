using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    public class Product
    {
        [Key]
        public int Id {get; set;}

        [Required]
        [StringLength(50)]
        public string Name { get; set; }
		
		public int Stock { get; set; }

        // [Column(TypeName = "money")]
		public int Price { get; set; }

		public string ImagePath {get; set;}

        public string Description {get; set;}

        public DateTime Created {get; set;}

        public DateTime Updated {get; set;}
        
        public string Categories {get; set;}

    }
}