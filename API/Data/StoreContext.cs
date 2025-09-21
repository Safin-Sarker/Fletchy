using System;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Build.Framework;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace API.Data;



public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
  public DbSet<Product> Products { get; set; }

  public DbSet<Basket> Baskets { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<IdentityRole>()
      .HasData(
        new IdentityRole
        {
          Id ="fec82532-5e4e-47bb-838c-90f783894e32",
          Name = "Member",
          NormalizedName = "MEMBER"
        },
        new IdentityRole
        {
          Id="f5532c63-0a7e-4e53-ad25-2e4c4be727c7",
          Name = "Admin",
          NormalizedName = "ADMIN"
        }
      );


  }
  





}


