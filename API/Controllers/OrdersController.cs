using System;
using API.Data;
using API.Entities.OrderAggregate1;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class OrdersController(StoreContext context): BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetOrders()
    {       
        var orders = await context.Orders
            .Include(o => o.OrderItems)
            .Where(o => o.BuyerEmail == User.GetUsername())
            .ToListAsync();
        return orders;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Order>> GetOrderDetails(int id)
    {
        var order = await context.Orders
            .Where(o => o.BuyerEmail == User.GetUsername()  && id == o.Id)
            .FirstOrDefaultAsync();

        if (order == null) return NotFound();

        return order;

    }
    

}
