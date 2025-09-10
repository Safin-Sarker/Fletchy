import { Box, Paper, Typography } from "@mui/material";
import { useFetchFiltersQuery } from "./catalogApi";
import Search from "./Search";
import { setBrands, setOrderBy, setTypes } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import RadionButtonGroup from "../../app/shared/components/RadionButtonGroup";
import CheckBoxButton from "../../app/shared/components/CheckBoxButton";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price : High to low" },
  { value: "price", label: "Price: Low To high" },
];

export default function Filters() {
  const { data } = useFetchFiltersQuery();
  const { orderBy, types, brands } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  if (!data?.brands || !data.types) return <Typography>Loading...</Typography>;

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Paper>
        <Search />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <RadionButtonGroup
          selectedValue={orderBy}
          options={sortOptions}
          onChange={(e) => dispatch(setOrderBy(e.target.value))}
        />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <CheckBoxButton
          items={data.brands}
          checked={brands}
          onChange={(items: string[]) => dispatch(setBrands(items))}
        />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <CheckBoxButton
          items={data.types}
          checked={types}
          onChange={(items: string[]) => dispatch(setTypes(items))}
        />
      </Paper>
    </Box>
  );
}
