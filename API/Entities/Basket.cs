using System;

namespace API.Entities;

public class Basket
{
  public int Id { get; set; }

  public required string BasketId { get; set; }

  public List<BasketItem> Items { get; set; } = new List<BasketItem>();

  public string? ClientSecret { get; set; }

  public string? PaymentIntentId { get; set; }

  public void AddItem(Product product, int quantity)
  {
    if (product == null) ArgumentNullException.ThrowIfNull(product);
    if (quantity <= 0) throw new ArgumentOutOfRangeException(nameof(quantity), "Quantity must be greater than zero.");

    var existingItem = FindItem(product.Id);

    if (existingItem != null)
    {
      existingItem.Quantity += quantity;
    }
    else
    {
      var newItem = new BasketItem
      {
        ProductId = product.Id,
        Product = product,
        Quantity = quantity
      };
      Items.Add(newItem);
    }
  }

  public void RemoveItem(int productId, int quantity)
  {
    if (quantity <= 0) throw new ArgumentOutOfRangeException(nameof(quantity), "Quantity must be greater than zero.");

    var existingItem = FindItem(productId);

    if (existingItem == null) return;

    existingItem.Quantity -= quantity;

    if (existingItem.Quantity <= 0)
    {
      Items.Remove(existingItem);
    }
  }



  private BasketItem? FindItem(int productId)
  {
    return Items.FirstOrDefault(item => item.ProductId == productId);
  }

}

