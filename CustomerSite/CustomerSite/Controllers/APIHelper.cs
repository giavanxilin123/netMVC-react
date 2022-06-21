using System;
namespace CustomerSite.Controllers
{
	public class APIHelper
	{
		public static HttpClient ApiClient { get; set; }

		public static void InitializeClientString()
        {
			ApiClient = new HttpClient();
			ApiClient.BaseAddress = new Uri("https://localhost:7010/");
			ApiClient.DefaultRequestHeaders.Accept.Clear();
			ApiClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
        }
	}
}

