import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setsearchTerm } from "./catalogSlice";
import { useEffect, useState } from "react";

export default function Search() {
  const { searchTerm } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const [term, setTerm] = useState(searchTerm);

  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);

  const debouncedSearch = debounce((e) => {
    dispatch(setsearchTerm(e.target.value));
  }, 500);

  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      type="search"
      value={term}
      onChange={(e) => {
        setTerm(e.target.value);
        debouncedSearch(e);
      }}
    />
  );
}
