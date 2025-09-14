import { Grid2, Typography } from "@mui/material";
import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagiantion from "../../app/shared/components/AppPagiantion";
import { setPageNumber } from "./catalogSlice";

export default function Catalog() {
  const productParams = useAppSelector((state) => state.catalog);
  const { data, isLoading } = useFetchProductsQuery(productParams);
  const dispatch = useAppDispatch();

  if (isLoading || !data) return <div>Loading products...</div>;
  return (
    <Grid2 container spacing={4}>
      <Grid2>
        <Filters />
      </Grid2>
      <Grid2 size={9}>
        {data.items && data.items.length > 0 ? (
          <>
            <ProductList products={data.items} />
            <AppPagiantion
              metadata={data.pagination}
              onPageChange={(page: number) => dispatch(setPageNumber(page))}
            />
          </>
        ) : (
          <Typography variant="h5">
            {" "}
            There are no results for this filter
          </Typography>
        )}
      </Grid2>
    </Grid2>
  );
}
