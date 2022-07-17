using System;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
namespace CustomerSite.Helper
{
    public class APIHelper
    {
        // public static HttpClient ApiClient { get; set; }

		public HttpClient initial()
        {
			var client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:7010/");
            //client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            // client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            return client;
        }
    }
}




