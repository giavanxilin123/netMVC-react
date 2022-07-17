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
        private APIHelper _api = new APIHelper();
       
        public List<Product> bestProduct = new List<Product>();

        public async Task<IActionResult> OnGetAsync(){
            HttpClient client = _api.initial();
            var response = await client.GetAsync("api/product/getBestSeller");
            var result =  response.Content.ReadAsStringAsync().Result;    
            bestProduct = JsonConvert.DeserializeObject<List<Product>>(result);
            return Page();
        }

        // public async Task<IActionResult> OnPostAsync(){
        //     HttpClient client = _api.initial();
        //     var response = await client.GetAsync("api/product/getBestSeller");
        //     var result =  response.Content.ReadAsStringAsync().Result;    
        //     bestProduct = JsonConvert.DeserializeObject<List<Product>>(result);
        //     Response.Cookies.Delete("access_token");
        //     Response.Cookies.Delete("user");
        //     return Page();
        // } 
    }
}
