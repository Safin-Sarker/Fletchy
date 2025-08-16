import { useEffect, useState } from "react";
import type { Product } from "../Models/product";
import Catalog from "../../Features/catalog/Catalog";
import { Box, Button, Container, Typography } from "@mui/material";
import NavBar from "./NavBar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 14 }}>
        <Catalog product={products} />
      </Container>
    </>
  );
}

export default App;
