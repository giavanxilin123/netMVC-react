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
    public class UserController : ControllerBase
    {
        public readonly BakeryDbContext _context;
        public UserController(BakeryDbContext context) => _context = context;

        [HttpGet]
        public async Task<IEnumerable<User>> Get() => await _context.User.ToListAsync();

        [HttpPut("{username}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(string username, User user) {
            if (username != user.Username) return BadRequest();
            
            _context.Entry(user).State  = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        [HttpDelete("{username}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(string username) {
            var userToDelete = await _context.User.FindAsync(username);

            if (userToDelete == null) return NotFound();

            _context.User.Remove(userToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

