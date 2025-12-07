import type { Item } from "../../app/Models/basket";
import { useFetchBasketQuery } from "../../Features/basket/basketApi";

export const useBasketinfo = () => {
  const { data: basket } = useFetchBasketQuery();
  const subtotal =
    basket?.items.reduce(
      (sum: number, item: Item) => sum + item.quantity * item.price,
      0
    ) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;
  const total = subtotal + deliveryFee;

  return { basket, subtotal, deliveryFee, total };
};
