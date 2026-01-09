import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../Features/home/HomePage";
import Catalog from "../../Features/catalog/Catalog";
import ProductDetails from "../../Features/catalog/ProductDetails";
import AboutPage from "../../Features/about/AboutPage";
import ContactPage from "../../Features/contact/ContactPage";
import ServerError from "../erros/ServerError";
import NotFound from "../erros/NotFound";
import BasketPage from "../../Features/basket/BasketPage";
import CheckoutPage from "../../Features/checkout/CheckoutPage";
import CheckoutSuccess from "../../Features/checkout/CheckoutSuccess";
import LoginForm from "../../Features/account/LoginForm";
import RegisterForm from "../../Features/account/RegisterForm";
import RequireAuth from "./RequireAuth";
import OrderPage from "../../Features/orders/OrderPage";
import OrderDetailedPage from "../../Features/orders/OrderDetailedPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "checkout/success", element: <CheckoutSuccess /> },
          { path: "orders", element: <OrderPage /> },
          { path: "orders/:id", element: <OrderDetailedPage /> },
        ],
      },
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "basket", element: <BasketPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate to="/not-found" replace /> },
    ],
  },
]);
