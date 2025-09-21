using System;
using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(options =>
{
  options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddSingleton(TimeProvider.System);

builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleware>();

builder.Services
    .AddIdentity<User, IdentityRole>(opt =>
    {
      opt.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<StoreContext>()
    .AddDefaultTokenProviders(); 

// Register the email sender
builder.Services.AddSingleton<IEmailSender<User>, NoOpEmailSender>();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(options =>
{
  options.AllowAnyMethod()
         .AllowAnyHeader()
         .AllowCredentials()
         .WithOrigins("https://localhost:3000");
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGroup("api").MapIdentityApi<User>(); 

DbInitializer.InitDb(app);

app.Run();