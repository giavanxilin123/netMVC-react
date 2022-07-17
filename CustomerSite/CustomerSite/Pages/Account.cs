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
using Microsoft.AspNetCore.Http;

namespace CustomerSite.Pages
{
	public class AccountModel : PageModel
    {
        private APIHelper _api = new APIHelper();

        public UserResponseDto user = new UserResponseDto();

        public async Task<IActionResult> OnGetAsync(){
            var getUserCookie = Request.Cookies["user"];
            user = JsonConvert.DeserializeObject<UserResponseDto>(getUserCookie);
            return Page();
        }
    }
}
