using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    [Route("api/[controller]")]
    // [ApiController]
    public class BakeryController : Controller
    {
        public readonly BakeryDbContext _context;
        public BakeryController(BakeryDbContext context) => _context = context;

        [HttpGet]
        public async Task<IEnumerable<Admin>> Get()
        {
            return await _context.Admin.ToListAsync();
        }

        [HttpGet("id")]
        [ProducesResponseType(typeof(Admin), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var bakery = await _context.Admin.FindAsync(id);
            return bakery == null ? NotFound() : Ok(bakery);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(Admin admin)
        {
            await _context.Admin.AddAsync(admin);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = admin.Id }, admin);
        }

        //[HttpGet("customer")]
        //public async Task<IEnumerable<Customer>> Get()
        //{
        //    return await _context.Customer.ToListAsync();
        //}
        // GET: api/values
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // // POST api/values
        // [HttpPost]
        // public void Post([FromBody]string value)
        // {
        // }

        // // PUT api/values/5
        // [HttpPut("{id}")]
        // public void Put(int id, [FromBody]string value)
        // {
        // }

        // // DELETE api/values/5
        // [HttpDelete("{id}")]
        // public void Delete(int id)
        // {
        // }
    }
}

