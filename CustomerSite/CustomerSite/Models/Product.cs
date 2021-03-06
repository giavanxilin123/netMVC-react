namespace CustomerSite.Models
{
    public class Product
    {
        public int Id {get; set;}
        public string Name { get; set; }
		
		public int Stock { get; set; }

		public int Price { get; set; }

		public string ImagePath {get; set;}

        public double Score {get; set;}
        public Category Category {get; set;}

        public string Description {get; set;}

        public DateTime Created {get; set;}

        public DateTime Updated {get; set;}

    }
}