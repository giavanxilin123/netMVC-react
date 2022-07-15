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
    public class OrderController : ControllerBase
    {
        public readonly ChukChukDbContext _context;
        public OrderController(ChukChukDbContext context) => _context = context;

        [HttpGet]
        public async Task<IEnumerable<Order>> Get() => await _context.Order.Include(x => x.OrderLine).ToListAsync();

        
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var  order = await _context.Order.Include(x => x.OrderLine).Where(x => x.Id == id).FirstOrDefaultAsync();
            return order == null ? NotFound() : Ok(order);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(Order order)
        {
            await _context.Order.AddAsync(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
        }
        
    }
}

