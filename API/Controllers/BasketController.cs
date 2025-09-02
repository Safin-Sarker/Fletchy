using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context) : BaseApiController
{

  [HttpGet]
  public async Task<ActionResult<BasketDto>> GetBasket()
  {
    var basket = await RetriveBasket();

    if (basket == null) return NoContent();

    return basket.ToDto();

    
 

  }

  [HttpPost]
  public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
  {
    var basket = await RetriveBasket();

    basket ??= CreateBasket();

    var product = await context.Products.FindAsync(productId);

    if (product == null) return BadRequest("problem adding item to basket");

    basket.AddItem(product, quantity);

    var result = await context.SaveChangesAsync() > 0;

    if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());

    return StatusCode(201);

  }

  [HttpDelete]

  public async Task<IActionResult> RemoveBasketItem(int productId, int quantity)
  {
    var basket = await RetriveBasket();

    if (basket is null) return BadRequest("Unable to retrive basket");
    basket.RemoveItem(productId, quantity);

    var result = await context.SaveChangesAsync() > 0;

    if (result) return Ok();

    return BadRequest("Problem updating basket");
  }





  private async Task<Basket?> RetriveBasket()
  {
    return await context.Baskets
    .Include(x => x.Items)
    .ThenInclude(i => i.Product)
    .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
  }

  private Basket? CreateBasket()
  {

    var basketId = Guid.NewGuid().ToString();
    var cookieOptions = new CookieOptions
    {
      IsEssential = true,
      Expires = DateTime.UtcNow.AddDays(30)
    };

    Response.Cookies.Append("basketId", basketId, cookieOptions);
    var basket = new Basket { BasketId = basketId };
    context.Baskets.Add(basket);
    return basket;
   
    
  }



}
