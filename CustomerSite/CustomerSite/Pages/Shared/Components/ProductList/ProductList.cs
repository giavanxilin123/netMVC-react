using Microsoft.AspNetCore.Mvc;
using CustomerSite.Models;

namespace CustomerSite.Pages{
    public class ProductList : ViewComponent {
        public IViewComponentResult Invoke(List<Product> ProductList){
            return View<List<Product>>(ProductList);
        }
    }
}