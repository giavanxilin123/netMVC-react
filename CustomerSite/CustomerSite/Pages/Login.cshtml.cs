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
	public class LoginModel : PageModel
    {
        private APIHelper _api = new APIHelper();

        [BindProperty]
        public string username {get; set;}

        [BindProperty]
        public string password {get; set;}

        public bool Toast {get; set;} = false;

        public UserResponseDto user = new UserResponseDto();

        public async Task<IActionResult> OnPostAsync(){
            var UserDto = new UserLoginDto {
                username = username,
                password = password,
            };

            CookieOptions options = new CookieOptions();
            options.Expires = DateTime.Now.AddDays(1);

            HttpClient client = _api.initial();
            var response = await client.PostAsJsonAsync("api/auth/login", UserDto);
            var result =  response.Content.ReadAsStringAsync().Result;
            if ((int)response.StatusCode == 200) {
                var responseGetUser = await client.GetAsync($"api/auth/{UserDto.username}");
                var resultGetUser = responseGetUser.Content.ReadAsStringAsync().Result;
                Response.Cookies.Append("access_token", result, options);
                Response.Cookies.Append("user", resultGetUser, options);
                return new RedirectToPageResult("Account");
            } 
            return Page();
        }


    }
}
