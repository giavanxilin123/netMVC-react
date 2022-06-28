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
    public class ProductController : ControllerBase
    {
        public readonly BakeryDbContext _context;
        public ProductController(BakeryDbContext context) => _context = context;

        [HttpGet]
        public async Task<IEnumerable<Product>> Get() => await _context.Product.ToListAsync();

        // c.ForEach(x => Console.WriteLine(x.Name)); => get name

        [HttpGet("GetByCategories/{categories}")]
        [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetByCategories(string categories)
        {
            var product = await _context.Product.Where(x => x.Categories == categories).ToListAsync();
            return product == null ? NotFound() : Ok(product);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _context.Product.Where(x => x.Id == id).FirstOrDefaultAsync();
            return product == null ? NotFound() : Ok(product);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(Product product)
        {
            await _context.Product.AddAsync(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, Product product) {
            if (id != product.Id) return BadRequest();

            _context.Entry(product).State  = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id) {
            var productToDelete = await _context.Product.FindAsync(id);

            if (productToDelete == null) return NotFound();

            _context.Product.Remove(productToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

