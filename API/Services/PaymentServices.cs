using API.Entities;
using Stripe;
using System.Linq; 


namespace API.Services;

public class PaymentServices(IConfiguration config)
{
  public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
  {
    StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];

    var service = new PaymentIntentService();

    var intent = new PaymentIntent();

    var subtotal = basket.Items.Sum(i => i.Quantity * i.Product.Price);
    var deliveryFee = subtotal > 10000 ? 0 : 500;

    if (string.IsNullOrEmpty(basket.PaymentIntentId))
    {
      var options = new PaymentIntentCreateOptions
      {
        Amount = subtotal + deliveryFee,
        Currency = "usd",
        PaymentMethodTypes = ["card"]
      };
      intent = await service.CreateAsync(options);
    }
    else
    {
      // Get the existing PaymentIntent to check its status
      intent = await service.GetAsync(basket.PaymentIntentId);

      // Only update if payment hasn't succeeded yet
      if (intent.Status == "requires_payment_method" ||
          intent.Status == "requires_confirmation" ||
          intent.Status == "requires_action")
      {
        var options = new PaymentIntentUpdateOptions
        {
          Amount = subtotal + deliveryFee
        };
        intent = await service.UpdateAsync(basket.PaymentIntentId, options);
      }
      else if (intent.Status == "succeeded")
      {
        // If payment already succeeded, create a new PaymentIntent
        var options = new PaymentIntentCreateOptions
        {
          Amount = subtotal + deliveryFee,
          Currency = "usd",
          PaymentMethodTypes = ["card"]
        };
        intent = await service.CreateAsync(options);
      }
    }

    return intent;

  }

}
