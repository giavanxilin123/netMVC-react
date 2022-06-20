using System;
using System.Collections;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
	public class BakeryDbContext : DbContext
	{
		public BakeryDbContext(DbContextOptions<BakeryDbContext> options)
			:base(options)
        {

        }

		// public DbSet<Issue> Issue { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Admin> Admin { get; set; }
 
    }

    //class Stack<T>
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



