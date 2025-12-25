using System;

namespace API.Entities.OrderAggregate1;

public class OrderItem
{
    public int Id { get; set; }

    public required ProductItemOrdered ItemOrdered { get; set; } = null!;

    public long Price { get; set; }

    public int Quantity { get; set; }

}
