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
    [ApiController]
    public class CustomerController : ControllerBase
    {
        public readonly BakeryDbContext _context;
        public CustomerController(BakeryDbContext context) => _context = context;

        [HttpGet]
        public async Task<IEnumerable<Customer>> Get()
        {
            return await _context.Customer.ToListAsync();
        }
    }
}

