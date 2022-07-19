using System;
using System.Collections;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
	public class ChukChukDbContext : DbContext
	{
		public ChukChukDbContext(DbContextOptions<ChukChukDbContext> options)
			:base(options)
        {

        }
        public DbSet<Admin> Admin { get; set; }
        public DbSet<Category> Category {get; set;}
        public DbSet<Product> Product { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Rating> Rating { get; set; }
        public DbSet<Order> Order {get; set;}
    }
}



