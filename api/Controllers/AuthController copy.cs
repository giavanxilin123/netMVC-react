using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly BakeryDbContext _context;
        private readonly IConfiguration _configuration ;
        public AuthController(BakeryDbContext context, IConfiguration configuration) 
        {_context = context; 
        _configuration = configuration;}
     
        // nhảy 400 khi tồn tại username
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            // var user = await _context.User.Where(x => x.Username == request.Username).FirstOrDefaultAsync();
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            User user = new User();
            user.Username = request.Username;
            user.Name = request.Name;
            user.Age = request.Age;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Name = request.Name;
            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetByUsername), new { username = user.Username }, user);
        }

        [HttpGet("{username}")]
        [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetByUsername(string username)
        {
            var user = await _context.User.Where(x => x.Username == username).FirstOrDefaultAsync();
            return user == null ? NotFound() : Ok(user);
        }        

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request){
            var user = await _context.User.Where(x => x.Username == request.Username).FirstOrDefaultAsync();
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            if(!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong password");
            }

            string token = CreateToken(user);
            return Ok(token);
        }

        

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt){
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);
            }
        }
    }
}