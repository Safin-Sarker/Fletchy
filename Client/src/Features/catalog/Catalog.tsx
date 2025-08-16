import type { Product } from "../../app/Models/product";
import ProductList from "./ProductList";

type Props = {
  product: Product[];
};

export default function Catalog({ product }: Props) {
  return (
    <>
      <ProductList products={product} />
    </>
  );
}
