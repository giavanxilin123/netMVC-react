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
    public class AdminController : ControllerBase
    {
        public readonly BakeryDbContext _context;
        public AdminController(BakeryDbContext context) => _context = context;

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
            var admin = await _context.Admin.FindAsync(id);
            return admin == null ? NotFound() : Ok(admin);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(Admin admin)
        {
            await _context.Admin.AddAsync(admin);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = admin.Id }, admin);
        }

        [HttpPut("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, Admin admin) {
            if (id != admin.Id) return BadRequest();

            _context.Entry(admin).State  = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        [HttpDelete("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id) {
            var adminToDelete = await _context.Admin.FindAsync(id);

            if (adminToDelete == null) return NotFound();

            _context.Admin.Remove(adminToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

