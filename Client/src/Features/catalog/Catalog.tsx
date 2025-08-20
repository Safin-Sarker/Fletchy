import { useEffect, useState } from "react";
import type { Product } from "../../app/Models/product";
import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";

export default function Catalog() {
  const { data, isLoading } = useFetchProductsQuery();

  if (isLoading || !data) return <div>Loading products...</div>;
  return (
    <>
      <ProductList products={data} />
    </>
  );
}
