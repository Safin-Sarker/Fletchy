import { useEffect, useState } from "react";
import type { Product } from "../Models/product";
import Catalog from "../../Features/catalog/Catalog";
import { Container, Typography } from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  const addProduct = () => {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: "Product" + (prevState.length + 1),
        price: prevState.length * 100 + 100.0,
        quantityInStock: 10,
        description: "This is a product",
        pictureUrl: "https://picsum.photos/200/300",
        type: "Test",
        brand: "Test",
      },
    ]);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Fletchy</Typography>
      <Catalog products={products} addProduct={addProduct} />
    </Container>
  );
}

export default App;
