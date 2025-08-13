using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(options =>
{

  options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));


});

builder.Services.AddCors();

var app = builder.Build();


app.MapControllers();

DbInitializer.InitDb(app);

app.UseCors(options =>
{
  options.AllowAnyMethod()
         .AllowAnyHeader()
         .WithOrigins("https://localhost:3000");
});

app.Run();
