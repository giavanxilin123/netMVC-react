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
    public class CategoryController : ControllerBase
    {
        public readonly ChukChukDbContext _context;
        public CategoryController(ChukChukDbContext context) => _context = context;

        [HttpGet]
        public async Task<IEnumerable<Category>> Get() => await _context.Category.ToListAsync();

        // [HttpGet("{name}")]
        // [ProducesResponseType(typeof(Category), StatusCodes.Status200OK)]
        // [ProducesResponseType(StatusCodes.Status404NotFound)]
        // public async Task<IActionResult> GetByName(string name)
        // {
        //     var  category = await _context.Category.Where(x => x.Name == name).FirstOrDefaultAsync();
        //     return category == null ? NotFound() : Ok(category);
        // }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Category), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var  category = await _context.Category.Where(x => x.Id == id).FirstOrDefaultAsync();
            return category == null ? NotFound() : Ok(category);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(Category category)
        {
            await _context.Category.AddAsync(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
        }

        [HttpDelete("{name}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(string name) {
            var categoryToDelete = await _context.Category.Where(x => x.Name ==  name).FirstOrDefaultAsync();

            if (categoryToDelete == null) return NotFound();

            _context.Category.Remove(categoryToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("DeleteById/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id) {
            var categoryToDelete = await _context.Category.FindAsync(id);

            if (categoryToDelete == null) return NotFound();

            _context.Category.Remove(categoryToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

