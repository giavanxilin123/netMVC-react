// using System.Diagnostics;
// using Microsoft.AspNetCore.Mvc;
// using CustomerSite.Models;
// using CustomerSite.Helper;
// using Newtonsoft.Json;
// using System.Collections.Generic;
// using System.Text;

// namespace CustomerSite.Controllers{

//     public class HomeController : Controller
//     {
//         APIHelper _api = new APIHelper();

//         public async Task<IActionResult> Index()
//         {
//             ViewBag.Id = 1;
//             ViewBag.Name = "";
//             ViewBag.Age = 0;
//             ViewBag.Role = "";
//             //ViewBag.Created = DateTime.Now.AddDays(0).ToString("dd-MM-yyyy");
//             ViewBag.Created = DateTime.Now.ToUniversalTime().ToString("s") + "Z";
//             ViewBag.PhoneNumber = "";

//             Admin list = new Admin();
            
//             List<Admin> data = new List<Admin>();
//             HttpClient client = _api.initial();

//             HttpResponseMessage res = await client.GetAsync("api/admin/");
//             if (res.IsSuccessStatusCode)
//             {
//                 var result = res.Content.ReadAsStringAsync().Result;
//                 data = JsonConvert.DeserializeObject<List<Admin>>(result);

            
//                 data.ForEach(d =>
//                 {
//                     list.admin.Add(new Admin
//                     {
//                         Name = d.Name,
//                         Id = d.Id,
//                         Role = d.Role,
//                         Age = d.Age,
//                         PhoneNumber = d.PhoneNumber,
//                         Created = d.Created
//                     });
//                 });
//             }

//             List<Admin> model = list.admin.ToList();
            
//             return View(model);
//         }


//         [HttpPost]
//         public async Task<ActionResult<Admin>> AddAdmin(Admin model)
//         {
//             HttpClient client = _api.initial();
//             var content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
//             var action = "api/admin";
//             if (model.Id == 0)
//             {
//                 HttpResponseMessage res = await client.PostAsync(action, content).ConfigureAwait(false);
//                 res.EnsureSuccessStatusCode();
//                 if (res.IsSuccessStatusCode)
//                 {
//                     var result = res.Content.ReadAsStringAsync().Result;
//                 }
//                 return RedirectToAction("Index", "Home");
//             }
            
//             else
//             {
//                 action = "api/admin/id?id=" + model.Id;
//                 HttpResponseMessage res = await client.PutAsync(action, content).ConfigureAwait(false);
//                 res.EnsureSuccessStatusCode();
//                 if (res.IsSuccessStatusCode)
//                 {
//                     var result = res.Content.ReadAsStringAsync().Result;
//                 }
//                 return RedirectToAction("Index", "Home");
//             }

//         }


//         [HttpPost, ActionName("Delete")]
//         public async Task<ActionResult<Admin>> Delete(Admin model)
//         {

//             Console.WriteLine("delete");
//             HttpClient client = _api.initial();
//             Console.WriteLine("alo" + model.Id);
//             //var content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
//             var action = "api/admin/id?id=" + model.Id;
//             HttpResponseMessage res = await client.DeleteAsync(action).ConfigureAwait(false);
//             res.EnsureSuccessStatusCode();
//             //if (res.IsSuccessStatusCode)
//             //{
//             //    var result = res.Content.ReadAsStringAsync().Result;
//             //}
//             return RedirectToAction("Index", "Home");
//         }

//         public IActionResult Privacy()
//         {
//             return View();
//         }

//         [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
//         public IActionResult Error()
//         {
//             return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
//         }
//     }
// }

