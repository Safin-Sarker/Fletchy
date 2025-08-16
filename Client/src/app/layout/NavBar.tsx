import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

type props = {
  toggleDarkMode: () => void;
  darkmode: boolean;
};

export default function NavBar({ toggleDarkMode, darkmode }: props) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">Fletchy</Typography>
        <IconButton onClick={toggleDarkMode}>
          {darkmode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
