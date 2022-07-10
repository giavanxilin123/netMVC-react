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
		
        // public DbSet<Customer> Customer { get; set; }
        public DbSet<Admin> Admin { get; set; }
        public DbSet<Category> Category {get; set;}
        public DbSet<Product> Product { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Rating> Rating { get; set; }
    }

    //class Stack<T>
    //{
    //    T _fakevalue;
    //    public void push(T fakevalue)
    //    {
    //        _fakevalue = fakevalue;

    //    }
    //    public T pop()
    //    {
    //        return _fakevalue;
    //    }
    //}


    //public Stack<int> s = new Stack<int>();

}



