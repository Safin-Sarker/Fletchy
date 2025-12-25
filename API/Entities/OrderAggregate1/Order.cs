using System;
using Stripe;

namespace API.Entities.OrderAggregate1;

public class Order
{
    public int Id { get; set; }

    public required string BuyerEmail { get; set; }

    public required ShippingAddress ShippingAddress { get; set; }

    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    public List<OrderItem> OrderItems { get; set; } = [];

    public long Subtotal { get; set; }

    public long DeliveryFee { get; set; }

    public long Discount { get; set; }

    public string? PaymentIntentId { get; set; }

    public OrderStatus OrderStatus { get; set; } =OrderStatus.Pending;

    public required PaymentSummary PaymentSummary { get; set; }

    public long GetTotal()
    {
        return Subtotal + DeliveryFee - Discount;
    }









    // Other properties and methods related to Order can be added here

}
