import { useEffect, useState } from "react";
import type { Product } from "../Models/product";
import Catalog from "../../Features/catalog/Catalog";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import NavBar from "./NavBar";
import { Css } from "@mui/icons-material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [darkmode, setdarkmode] = useState(false);
  const palletteType = darkmode ? "dark" : "light";

  const toggleDarkMode = () => {
    setdarkmode(!darkmode);
  };

  const theme = createTheme({
    palette: {
      mode: palletteType,
      background: {
        default: palletteType == "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar toggleDarkMode={toggleDarkMode} darkmode={darkmode} />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkmode
            ? "radial-gradient(circle ,#1e3aBa,#111B27)"
            : "radial-gradient(circle ,#baecf9,#f0f9ff)",
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Catalog product={products} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
