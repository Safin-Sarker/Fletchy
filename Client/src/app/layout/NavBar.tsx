import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const rightLinks = [
  { title: "LOGIN", path: "/login" },
  { title: "REGISTER", path: "/register" },
];

const navStyles = [
  {
    color: "inherit",
    Typography: "h6",
    textDecoration: "none",
    "&:hover": { color: "grey.500" },
    "&.active": { color: "#baecf9" },
  },
];

type props = {
  toggleDarkMode: () => void;
  darkmode: boolean;
};

export default function NavBar({ toggleDarkMode, darkmode }: props) {
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display={"flex"} alignItems="center">
          <Typography component={NavLink} to="/" variant="h6" sx={navStyles}>
            Fletchy
          </Typography>
          <IconButton onClick={toggleDarkMode}>
            {darkmode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display={"flex"} alignItems="center">
          <IconButton size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
