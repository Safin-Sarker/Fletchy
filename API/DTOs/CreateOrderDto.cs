using System;
using API.Entities.OrderAggregate1;
using Stripe;

namespace API.DTOs;

public class CreateOrderDto
{

    public required ShippingAddress shippingAddress { get; set; }

    public required PaymentSummary paymentSummary { get; set; }


}
