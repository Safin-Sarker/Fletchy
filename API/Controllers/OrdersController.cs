using System;
using API.Data;
using API.DTOs;
using API.Entities;
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
    public async Task<ActionResult<List<OrderDto>>> GetOrders()
    {       
        var orders = await context.Orders
            .ProjectToDto()
            .Where(o => o.BuyerEmail == User.GetUsername())
            .ToListAsync();
        return orders;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> GetOrderDetails(int id)
    {
        var order = await context.Orders
            .ProjectToDto()
            .Where(o => o.BuyerEmail == User.GetUsername()  && id == o.Id)
            .FirstOrDefaultAsync();

        if (order == null) return NotFound();

        return order;

    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto createOrderDto)
    {
        var basket = await context.Baskets.GetBasketWithItems (Request.Cookies["basketId"]);

        if (basket == null || basket.Items.Count == 0 || string.IsNullOrEmpty(basket.PaymentIntentId))
          return BadRequest("Basket is empty");

        var items = CreateOrderItems(basket.Items);

        if(items == null)
          return BadRequest("One or more items in your basket are no longer available in the desired quantity");

        var subtotal = items.Sum(item => item.Price * item.Quantity);

        var deliveryFee = CalculateDeliveryFee(subtotal);

        var order = new Order
        {
            BuyerEmail = User.GetUsername(),
            OrderItems = items,
            ShippingAddress = createOrderDto.shippingAddress,
            Subtotal = subtotal,
            DeliveryFee = deliveryFee,
            PaymentSummary = createOrderDto.paymentSummary,
            PaymentIntentId = basket.PaymentIntentId
        };

        context.Orders.Add(order);

        context.Baskets.Remove(basket);

        Response.Cookies.Delete("basketId");

        var result = await context.SaveChangesAsync() > 0;

        if(!result) return BadRequest("Problem creating order");

        return CreatedAtAction(nameof(GetOrderDetails), new {id = order.Id}, order.ToDto());

    }

    private long CalculateDeliveryFee(long subtotal)
    {
        return subtotal > 10000 ? 0 : 500;
    }

    private List<OrderItem> CreateOrderItems(List<BasketItem> items)
    {
        var orderItems = new List<OrderItem>();

        foreach (var item in items)
        {
            if(item.Product.QuantityInStock < item.Quantity)
            {
                return null;
            }
            var orderItem = new OrderItem
            {
                ItemOrdered = new ProductItemOrdered
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    PictureUrl = item.Product.PictureUrl
                },
                Price = item.Product.Price,
                Quantity = item.Quantity

            };
            orderItems.Add(orderItem);

            item.Product.QuantityInStock -= item.Quantity;
           
        }

        return orderItems;
    }
}
