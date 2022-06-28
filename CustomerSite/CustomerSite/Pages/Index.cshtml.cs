using System;
using System.Collections.Generic;
using System.Linq;
using CustomerSite.Helper;
using CustomerSite.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CustomerSite.Pages
{
	public class IndexModel : PageModel
    {
        // private HttpClient _client;
        private APIHelper _api = new APIHelper();
       
        public List<Product> data = new List<Product>();

        public async Task<IActionResult> OnGetAsync(){
            HttpClient client = _api.initial();
            var response = await client.GetAsync("api/product/");
            var result =  response.Content.ReadAsStringAsync().Result;
            data = JsonConvert.DeserializeObject<List<Product>>(result);
            return Page();
        }
        
    }
}
