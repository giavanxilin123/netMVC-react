using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
	public class Customer
	{
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		public int Age { get; set; }
	}
}

