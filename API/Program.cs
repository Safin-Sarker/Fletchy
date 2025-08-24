using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(options =>
{

  options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));


});

builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();


app.MapControllers();

app.UseMiddleware<ExceptionMiddleware>();

DbInitializer.InitDb(app);

app.UseCors(options =>
{
  options.AllowAnyMethod()
         .AllowAnyHeader()
         .WithOrigins("https://localhost:3000");
});

app.Run();
