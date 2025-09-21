using System;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Address
{
  [JsonIgnore]
  public int Id { get; set; }

  public required string Name { get; set; }

  public required string Line1 { get; set; }

  public string? Line2 { get; set; }

  public required string city { get; set; }

  public required string State { get; set; }

  [JsonPropertyName("postal_Code")]
  public required string PostalCode { get; set; }

  public required string Country { get; set; }

}
