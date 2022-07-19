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
	public class RegisterModel : PageModel
    {
        private APIHelper _api = new APIHelper();

        [BindProperty]
        public string username {get; set;}

        [BindProperty]
        public string password {get; set;}

        [BindProperty]
        public string name {get; set;}
        public async Task<IActionResult> OnPostAsync(){
            var UserDto = new UserRegisterDto {
                username = username,
                password = password,
                name = name
            };
            HttpClient client = _api.initial();
            var response = await client.PostAsJsonAsync("api/auth/register", UserDto);
            if ((int)response.StatusCode == 201) {
                return new RedirectToPageResult("Login");
            }
            return Page();
        }
        
    }
}
