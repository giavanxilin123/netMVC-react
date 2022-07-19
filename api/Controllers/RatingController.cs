using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Dto.Rating;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllerss
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        public readonly ChukChukDbContext _context;
        public RatingController(ChukChukDbContext context) => _context = context;

        [HttpGet]
        public async Task<IEnumerable<Rating>> Get() => await _context.Rating
            .Include(x => x.Product)
            .Include(x => x.User)
            .ToListAsync();

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Rating), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var rating = await _context.Rating
                .Include(x => x.User)
                .Where(x => x.RatingId == id)
                .FirstOrDefaultAsync();
            return rating == null ? NotFound() : Ok(rating);
        }

        [HttpGet("GetAverageScore/{productId}")]
        [ProducesResponseType(typeof(Rating), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAverageScore(int productId)
        {
            var rating = await _context.Rating
                .Where(x => x.Product.Id == productId)
                .ToListAsync();
                
            var average = rating.Count == 0 
                ? 0 
                : rating.Select(x => x.Score).Average();
            return rating == null ? NotFound() : Ok(average);
        }

        [HttpGet("GetRating/{productId}")]
        [ProducesResponseType(typeof(Rating), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetRating(int productId)
        {
            var rating = await _context.Rating
                .Include(x => x.User)
                .Where(x => x.Product.Id == productId)
                .ToListAsync();
            return rating == null ? NotFound() : Ok(rating);
        }

        // [Authorize]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(RatingDto ratingDto)
        {
            var id = ratingDto.ProductId;
            var product = _context.Product.Find(id);
            var user = _context.User.Find(ratingDto.Username);

            var rating = new Rating {
                RatingId = ratingDto.RatingId,
                User = user,
                Product = product,
                Score = ratingDto.Score,
                Comment = ratingDto.Comment,
                Created = ratingDto.Created,
                Updated = ratingDto.Updated
            };
            
            await _context.Rating.AddAsync(rating);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = rating.RatingId }, rating);
        }
        
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id) {
            var ratingToDelete = await _context.Rating.FindAsync(id);

            if (ratingToDelete == null) return NotFound();

            _context.Rating.Remove(ratingToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

