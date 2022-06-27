using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CustomerSite.Pages
{
	public class ProductModel : PageModel
    {
        public int b = 10;
        public void OnGet()
        {
        }
        public int GetB()
        {
            return b * 2;
        }
    }
}
