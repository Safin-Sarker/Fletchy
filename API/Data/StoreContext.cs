using System;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data;



public class StoreContext(DbContextOptions options) : DbContext(options)
{
  public DbSet<Product> Products { get; set; }

  public DbSet<Basket> Baskets { get; set; }



}


