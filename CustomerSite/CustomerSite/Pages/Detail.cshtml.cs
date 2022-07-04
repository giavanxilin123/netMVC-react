using System;
using System.Collections.Generic;
using System.Linq;
using CustomerSite.Helper;
using CustomerSite.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Globalization;

namespace CustomerSite.Pages
{
	public class DetailModel : PageModel
    {
        private APIHelper _api = new APIHelper();
       
        [BindProperty]
        public string UserId {get; set;}

        [BindProperty]
        public string Star {get; set;}
        
        public Product product;

        public double average;

        public List<Rating> ratingList = new List<Rating>();

        public async Task<IActionResult> OnGetAsync(int id){
            HttpClient client = _api.initial();
            var response = await client.GetAsync($"api/product/{id}");
            var result =  response.Content.ReadAsStringAsync().Result;
            product = JsonConvert.DeserializeObject<Product>(result);
            
            var response1 = await client.GetAsync($"api/rating/getaveragescore/{id}");
            average = Math.Round(double.Parse(response1.Content.ReadAsStringAsync().Result, CultureInfo.InvariantCulture.NumberFormat) * 2);
           
            var response2 = await client.GetAsync($"api/rating/getRating/{id}");
            ratingList = JsonConvert.DeserializeObject<List<Rating>>(response2.Content.ReadAsStringAsync().Result);
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int id){
            Rating rating = new Rating();
            HttpClient client = _api.initial();
            var response = await client.GetAsync($"api/product/{id}");
            var result =  response.Content.ReadAsStringAsync().Result;
            product = JsonConvert.DeserializeObject<Product>(result);
            
            rating.UserId = 1;
            rating.Product.Id = id;
            rating.Score = Int32.Parse(Star);
            
            await client.PostAsJsonAsync("/api/Rating", rating);
            
            var response1 = await client.GetAsync($"api/rating/getaveragescore/{id}");
            average = Math.Round(double.Parse(response1.Content.ReadAsStringAsync().Result, CultureInfo.InvariantCulture.NumberFormat) * 2);

            var response2 = await client.GetAsync($"api/rating/getRating/{id}");
            ratingList = JsonConvert.DeserializeObject<List<Rating>>(response2.Content.ReadAsStringAsync().Result);
            return Page();
        }
    }
}
