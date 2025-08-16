import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../Features/catalog/Catalog";
import HomePage from "../../Features/home/HomePage";
import ProductDetails from "../../Features/catalog/ProductDetails";
import AboutPage from "../../Features/about/AboutPage";
import ContactPage from "../../Features/contact/ContactPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/catalog", element: <Catalog /> },
      { path: "/catalog/:id", element: <ProductDetails /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
]);
