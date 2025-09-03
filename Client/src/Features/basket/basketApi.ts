import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Item, type Basket } from "../../app/Models/basket";
import type { Product } from "../../app/Models/product";

export const basketApi = createApi({
  reducerPath: "basketApi",
  tagTypes: ["Basket"],
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchBasket: builder.query<Basket, void>({
      query: () => "/basket",
      providesTags: ["Basket"],
    }),
    addBasketItem: builder.mutation<
      Basket,
      { product: Product; quantity: number }
    >({
      query: ({ product, quantity }) => ({
        url: `basket?productId=${product.id}&quantity=${quantity}`,
        method: "POST",
      }),
      onQueryStarted: async (
        { product, quantity },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            const existingItem = draft.items.find(
              (item) => item.productId === product.id
            );
            if (existingItem) existingItem.quantity += quantity;
            else draft.items.push(new Item(product, quantity));
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
    removeBasketItem: builder.mutation<
      Basket,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useFetchBasketQuery, useAddBasketItemMutation } = basketApi;
