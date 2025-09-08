import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/Models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { ProductParams } from "../../app/Models/productParams";
import { filterEmptyValues } from "../../lib/util";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], ProductParams>({
      query: (productParams) => {
        return {
          url: "products",
          params: filterEmptyValues(productParams),
        };
      },
    }),

    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => `products/${productId}`,
    }),

    fetchFilters: builder.query<{ brands: string[]; types: string[] }, void>({
      query: () => "products/filters",
    }),
  }),
});

export const {
  useFetchProductDetailsQuery,
  useFetchProductsQuery,
  useFetchFiltersQuery,
} = catalogApi;
